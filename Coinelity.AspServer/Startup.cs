using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json.Serialization;
using System.IO;
using System.Reflection;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Coinelity.AspServer.Middleware;
using Coinelity.AspServer.DataAccess;
using Coinelity.AspServer.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Coinelity.AspServer
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
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
                options.Password.RequireDigit = false;
                options.Password.RequiredLength = 8;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
                options.Password.RequireLowercase = false;
            });
            //.AddDefaultTokenProviders();

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                // TODO: (Production) Change to true. HTTPS.
                options.RequireHttpsMetadata = false; // For development.
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    SaveSigninToken = true,
                    // Clock skew compensates for server time drift.
                    ClockSkew = TimeSpan.FromMinutes(1),
                    //Specify the key used to sign the token:
                    //IssuerSigningKey = SecurityKey,
                    RequireSignedTokens = true,
                    //Ensure the token hasn't expired:
                    RequireExpirationTime = true,
                    ValidateLifetime = true,
                    //Ensure the token audience matches our audience value(default true):
                    ValidateAudience = true,
                    ValidAudience = DotNetEnv.Env.GetString( "JWT_ISSUER" ),
                    //Ensure the token was issued by a trusted authorization server(default true):
                    ValidateIssuer = true,
                    IssuerSigningKey = new SymmetricSecurityKey( Encoding.UTF8.GetBytes(DotNetEnv.Env.GetString("JWT_KEY")) ),
                    ValidIssuer = DotNetEnv.Env.GetString("JWT_ISSUER")
                };
            });

            services.AddCors();

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            services.AddMvc()
                    .AddJsonOptions(options =>
                    {
                        options.SerializerSettings.DateTimeZoneHandling = Newtonsoft.Json.DateTimeZoneHandling.Utc;
                        options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                    });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseBrowserLink();
                app.UseDatabaseErrorPage();
            }

            DotNetEnv.Env.Load();

            app.UseCors(policyBuilder => {
                policyBuilder.WithOrigins("http://localhost:3000", "http://localhost:5000", "http://localhost:33620", "http://localhost")
                             .AllowAnyHeader()
                             .AllowAnyMethod()
                             .AllowCredentials();
            });

            app.UseAuthentication();

            app.UseMvc();
        }
    }
}
