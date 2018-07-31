using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Coinelity.AspServer.Models;

namespace Coinelity.AspServer.Middleware
{
    public static class JWTTokens
    {
        public static string Generate(string email, string userId)
        {
            List<Claim> claims = new List<Claim>
            {
                // The email serves as the user name.
                new Claim(JwtRegisteredClaimNames.Sub, email),
                new Claim(ClaimTypes.Name, email),
                new Claim(ClaimTypes.NameIdentifier, email),
                new Claim("id", userId),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            SymmetricSecurityKey key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes( DotNetEnv.Env.GetString("JWT_KEY") ));
            SigningCredentials signingCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha384);
            // TODO: Get from user configuration.
            DateTime expires = DateTime.UtcNow.AddDays( DotNetEnv.Env.GetDouble("JWT_EXPIRE_DAYS") );

            JwtSecurityToken token = new JwtSecurityToken(
                DotNetEnv.Env.GetString( "JWT_ISSUER" ),
                DotNetEnv.Env.GetString( "JWT_ISSUER" ),
                claims,
                expires: expires,
                signingCredentials: signingCredentials
            );

            return new JwtSecurityTokenHandler().WriteToken( token );
        }
    }
}
