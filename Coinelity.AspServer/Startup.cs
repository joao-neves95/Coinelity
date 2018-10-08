/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812
 *
 */

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Serialization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.HttpOverrides;
using Coinelity.AspServer.Middleware;
using Coinelity.AspServer.Hubs;
using Coinelity.AspServer.DataAccess;
using Coinelity.AspServer.Models;

namespace Coinelity.AspServer
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
            DotNetEnv.Env.Load();
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddTransient<IUserStore<ApplicationUser>, UserStore>();
            services.AddTransient<IRoleStore<ApplicationRole>, RoleStore>();
            services.AddScoped<IPasswordHasher<ApplicationUser>, AppPasswordHasher<ApplicationUser>>();

            // TODO: Alter password configuration.
            services.AddIdentity<ApplicationUser, ApplicationRole>(options =>
            {
                // TODO: Configure password requirements.
                options.Password.RequireDigit = false;
                options.Password.RequiredLength = Env.MinPasswordLen;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
                options.Password.RequireLowercase = false;
            });
            //.AddDefaultTokenProviders();
            //services.AddScoped<SignInManager<ApplicationUser>, AppSignInManager>();

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                // TODO: (Production) Change to true. HTTPS.
                // https://docs.microsoft.com/en-us/aspnet/core/security/enforcing-ssl?view=aspnetcore-2.1&tabs=visual-studio
                options.RequireHttpsMetadata = false; // For development.
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    SaveSigninToken = false,
                    // Clock skew compensates for server time drift.
                    ClockSkew = TimeSpan.FromMinutes(1),
                    //Specify the key used to sign the token:
                    RequireSignedTokens = true,
                    //Ensure the token hasn't expired:
                    RequireExpirationTime = true,
                    ValidateLifetime = true,
                    //Ensure the token audience matches our audience value(default true):
                    ValidateAudience = true,
                    ValidAudience = DotNetEnv.Env.GetString( "JWT_ISSUER" ),
                    //Ensure the token was issued by a trusted authorization server(default true):
                    ValidateIssuer = true,
                    // TODO: Change IssuerSigningKey with a cron job.
                    IssuerSigningKey = new SymmetricSecurityKey( Encoding.UTF8.GetBytes(DotNetEnv.Env.GetString("JWT_KEY")) ),
                    ValidIssuer = DotNetEnv.Env.GetString( "JWT_ISSUER" )
                };
            });

            services.ConfigureApplicationCookie(options =>
            {
                options.Cookie.Name = "AuthToken";
                options.LoginPath = "/";
            });

            services.AddCors();

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            services.AddMvc()
                    .SetCompatibilityVersion(CompatibilityVersion.Version_2_1)
                    .AddJsonOptions(options =>
                    {
                        options.SerializerSettings.DateTimeZoneHandling = Newtonsoft.Json.DateTimeZoneHandling.Utc;
                        options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                    });

            services.AddSignalR()
                .AddJsonProtocol( options =>
                 {
                     options.PayloadSerializerSettings.DateTimeZoneHandling = Newtonsoft.Json.DateTimeZoneHandling.Utc;
                     options.PayloadSerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                     
                 } );
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseStatusCodePages();
                app.UseBrowserLink();
                app.UseDatabaseErrorPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseCors(policyBuilder => {
                policyBuilder.WithOrigins("http://localhost:3000", "http://localhost:5000", "http://localhost:33620", "http://localhost" )
                             .AllowAnyHeader()
                             .AllowAnyMethod()
                             .AllowCredentials();
            });

            app.UseForwardedHeaders(new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto,
                ForwardedHostHeaderName = "Anonymous",
                OriginalHostHeaderName = "Anonymous",
            } );

            app.Use( async (context, next) =>
             {
                 context.Response.OnStarting( () =>
                 {
                     context.Response.Headers.Add("Server", "Anonymous");
                     return Task.FromResult( 0 );
                 } );

                 await next.Invoke();
             } );

            app.UseHttpsRedirection();
            app.UseAuthentication();

            app.UseSignalR( routes =>
             {
                 routes.MapHub<BinaryOptionsHub>( "/hubs/binary-options" );
                 routes.MapHub<CFDHub>( "/hubs/cfd" );
                 routes.MapHub<ChatHub>( "/hubs/chat" );
             } );

            app.UseMvc();
        }
    }
}
