// https://markjohnson.io/articles/asp-net-core-identity-without-entity-framework/
// https://github.com/mark-j/dapper-identity.

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using System.Data.SqlClient;
using Coinelity.Core.Data;
using Coinelity.Core;
using Coinelity.AspServer.Models;

namespace Coinelity.AspServer.DataAccess
{
    public class UserStore : IUserStore<ApplicationUser>, IUserEmailStore<ApplicationUser>, IUserPhoneNumberStore<ApplicationUser>, IUserPasswordStore<ApplicationUser>, IUserTwoFactorStore<ApplicationUser>
    {
        private readonly SqlConnection _connection;

        public UserStore()
        {
            this._connection = Env.GetMSSQLConnection();
        }

        public void Dispose()
        {
            GC.SuppressFinalize( this );
        }

        ~UserStore()
        {
            Dispose();
        }

        public async Task<IdentityResult> CreateAsync(ApplicationUser user, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();
            const string userIdQuery = "SELECT max(Id) FROM dbo.ApplicationUser";
            SqlConnection connection = Env.GetMSSQLConnection();

            SqlCommand[] commands = new SqlCommand[]
            {
                MSSQLClient.ParameterizeCommand(
                    connection,
                    @"INSERT INTO dbo.ApplicationUser (Email, NormalizedEmail, Password)
                      VALUES (@Email, @NormalizedEmail, @Password)",
                    new Dictionary<string, object>
                    {
                        { "@Email", user.Email },
                        { "@NormalizedEmail", user.NormalizedEmail },
                        { "@Password", user.Password }
                    }),
                new SqlCommand(
                    $@"INSERT INTO dbo.ApplicationUserRoles (UserId)
                       VALUES (({ userIdQuery }))",
                    connection),
                new SqlCommand(
                    $@"INSERT INTO dbo.ApplicationUserSettings (UserId, LastUpdate)
                      VALUES (({ userIdQuery }), GETUTCDATE())",
                    connection),
                new SqlCommand(
                    $@"INSERT INTO dbo.ApplicationUserAccount (UserId)
                      VALUES (({ userIdQuery }))",
                    connection),
                MSSQLClient.ParameterizeCommand(
                    connection,
                    $@"INSERT INTO dbo.AuditLog (UserId, EventTypeId, UserIP)
                       VALUES (({ userIdQuery }), { (int)EventType.Register }, @IpAddress)",
                    new Dictionary<string, object>
                    {
                        { "@IpAddress", user.IpAddress }
                    })
            };

            bool success = await MSSQLClient.NonQueryTransactionAsync(connection, commands);

            if (!success)
                return IdentityResult.Failed();

            return IdentityResult.Success;
        }

        public Task<IdentityResult> DeleteAsync(ApplicationUser user, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public async Task<ApplicationUser> FindByIdAsync(string userId, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            IList<Dictionary<string, object>> userListDictionaries = await MSSQLClient.QueryAsync(_connection,
                $@"SELECT *
                   FROM dbo.ApplicationUser
                   WHERE Id = @ID",
                new Dictionary<string, object>()
                {
                    { "@ID", userId }
                }
            );

            return Utils.GetObject<ApplicationUser>(userListDictionaries);
        }

        public async Task<ApplicationUser> FindByEmailAsync(string normalizedEmail, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            IList<Dictionary<string, object>> userListDictionaries = await MSSQLClient.QueryAsync(_connection,
                $@"SELECT *
                   FROM dbo.ApplicationUser
                   WHERE NormalizedEmail = @NormalizedEmail",
                new Dictionary<string, object>
                {
                    { "@NormalizedEmail", normalizedEmail }
                }
            );

            return Utils.GetObject<ApplicationUser>( userListDictionaries );
        }

        public Task<ApplicationUser> FindByNameAsync(string normalizedUserName, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            // The (normalized) email serves as the username.
            return FindByEmailAsync(normalizedUserName, cancellationToken);
        }

        public Task<string> GetUserIdAsync(ApplicationUser user, CancellationToken cancellationToken)
        {
            return Task.FromResult( user.Id.ToString() );
        }

        public Task SetPasswordHashAsync(ApplicationUser user, string passwordHash, CancellationToken cancellationToken)
        {
            user.Password = passwordHash;
            return Task.FromResult(0);
        }
        public Task SetEmailAsync(ApplicationUser user, string email, CancellationToken cancellationToken)
        {
            user.Email = email;
            return Task.FromResult(0);
        }
        public Task SetNormalizedEmailAsync(ApplicationUser user, string normalizedEmail, CancellationToken cancellationToken)
        {
            user.NormalizedEmail = normalizedEmail;
            return Task.FromResult(0);
        }

        public Task SetEmailConfirmedAsync(ApplicationUser user, bool confirmed, CancellationToken cancellationToken)
        {
            user.EmailConfirmed = confirmed;
            return Task.FromResult(0);
        }
        public Task SetUserNameAsync(ApplicationUser user, string userName, CancellationToken cancellationToken)
        {
            // The user email serves as the username.
            return SetEmailAsync(user, userName, cancellationToken);
        }

        public Task SetNormalizedUserNameAsync(ApplicationUser user, string normalizedName, CancellationToken cancellationToken)
        {
            // The user email serves as the username.
            return SetNormalizedEmailAsync(user, normalizedName, cancellationToken);
        }

        public Task SetPhoneNumberAsync(ApplicationUser user, string phoneNumber, CancellationToken cancellationToken)
        {
            user.PhoneNumber = phoneNumber;
            return Task.FromResult(0);
        }

        public Task SetPhoneNumberConfirmedAsync(ApplicationUser user, bool confirmed, CancellationToken cancellationToken)
        {
            user.PhoneNumberConfirmed = confirmed;
            return Task.FromResult(0);
        }

        public Task SetTwoFactorEnabledAsync(ApplicationUser user, bool enabled, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<string> GetUserNameAsync(ApplicationUser user, CancellationToken cancellationToken)
        {
            return Task.FromResult( user.Email );
        }

        public Task<string> GetEmailAsync(ApplicationUser user, CancellationToken cancellationToken)
        {
            return Task.FromResult( user.Email );
        }

        public Task<bool> GetEmailConfirmedAsync(ApplicationUser user, CancellationToken cancellationToken)
        {
            return Task.FromResult( user.EmailConfirmed );
        }

        public Task<string> GetNormalizedEmailAsync(ApplicationUser user, CancellationToken cancellationToken)
        {
            return Task.FromResult( user.NormalizedEmail );
        }

        public Task<string> GetNormalizedUserNameAsync(ApplicationUser user, CancellationToken cancellationToken)
        {
            // The user email serves as the username.
            return Task.FromResult( user.NormalizedEmail );
        }

        public Task<string> GetPasswordHashAsync(ApplicationUser user, CancellationToken cancellationToken)
        {
            return Task.FromResult( user.Password );
        }

        public Task<string> GetPhoneNumberAsync(ApplicationUser user, CancellationToken cancellationToken)
        {
            return Task.FromResult( user.PhoneNumber );
        }

        public Task<bool> GetPhoneNumberConfirmedAsync(ApplicationUser user, CancellationToken cancellationToken)
        {
            return Task.FromResult( user.PhoneNumberConfirmed );
        }

        public Task<bool> GetTwoFactorEnabledAsync(ApplicationUser user, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<bool> HasPasswordAsync(ApplicationUser user, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<IdentityResult> UpdateAsync(ApplicationUser user, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
