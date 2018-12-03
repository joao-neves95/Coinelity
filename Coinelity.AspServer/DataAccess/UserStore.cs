/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

// https://markjohnson.io/articles/asp-net-core-identity-without-entity-framework/
// https://github.com/mark-j/dapper-identity.

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using System.Data.SqlClient;
using Coinelity.Core;
using Coinelity.Core.Data;
using Coinelity.Core.Errors;
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
            this._connection?.Dispose();
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
                       VALUES ({ userIdQuery })",
                    connection),
                new SqlCommand(
                    $@"INSERT INTO dbo.ApplicationUserSettings (UserId, LastUpdate)
                      VALUES ({ userIdQuery }, GETUTCDATE())",
                    connection),
                new SqlCommand(
                    $@"INSERT INTO dbo.ApplicationUserAccount (UserId)
                      VALUES ({ userIdQuery })",
                    connection),
                MSSQLClient.ParameterizeCommand(
                    connection,
                    $@"INSERT INTO dbo.AuditLog (UserId, EventTypeId, UserIP)
                       VALUES ({ userIdQuery }, { (int)EventType.Register }, @IpAddress)",
                    new Dictionary<string, object>
                    {
                        { "@IpAddress", user.IpAddress }
                    })
            };

            bool success = await MSSQLClient.NonQueryTransactionOnceAsync(connection, commands);

            if (!success)
                return IdentityResult.Failed();

            return IdentityResult.Success;
        }

        /// <summary>
        /// 
        /// USERS WILL NOT BE DELETED.
        /// 
        /// </summary>
        /// <param name="user"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        public Task<IdentityResult> DeleteAsync(ApplicationUser user, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// (Extra) Optimized (SELECT 1) way of knowing if the provided email exists on the database.
        /// </summary>
        /// <param name="userEmail"></param>
        /// <returns></returns>
        public async Task<bool> ExistsByEmailAsync(string userEmail)
        {
            IList<Dictionary<string, object>> userDictionaryList = await MSSQLClient.QueryOnceAsync(_connection,
                $@"SELECT 1
                   FROM dbo.ApplicationUser
                   WHERE Email = @Email",
                new Dictionary<string, object>
                {
                    { "@Email", userEmail }
                }
            );

            if (userDictionaryList.Count <= 0)
                return false;

            return true;
        }

        public async Task<ApplicationUser> FindByIdAsync(string userId, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            IList<Dictionary<string, object>> userDictionaryList = await MSSQLClient.QueryOnceAsync(_connection,
                $@"SELECT *
                   FROM dbo.ApplicationUser
                   WHERE Id = @ID",
                new Dictionary<string, object>()
                {
                    { "@ID", userId }
                }
            );

            return userDictionaryList.ToObject<ApplicationUser>();
        }

        public async Task<ApplicationUser> FindByEmailAsync(string normalizedEmail, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            IList<Dictionary<string, object>> userDictionaryList = await MSSQLClient.QueryOnceAsync(_connection,
                $@"SELECT *
                   FROM dbo.ApplicationUser
                   WHERE NormalizedEmail = @NormalizedEmail",
                new Dictionary<string, object>
                {
                    { "@NormalizedEmail", normalizedEmail }
                }
            );

            return userDictionaryList.ToObject<ApplicationUser>();
        }

        public Task<ApplicationUser> FindByNameAsync(string normalizedUserName, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            // The (normalized) email serves as the username.
            return FindByEmailAsync(normalizedUserName, cancellationToken);
        }

        /// <summary>
        /// Returns the user id as [string] or [null] if there is no user with the provided email.
        /// </summary>
        /// <param name="userEmail"></param>
        /// <returns></returns>
        public async Task<string> GetUserIdByEmailAsync(string userEmail)
        {
            IList<Dictionary<string, object>> userDictionaryList = await MSSQLClient.QueryOnceAsync(
                _connection,
                $@"SELECT Id
                   FROM dbo.ApplicationUser
                   WHERE Email = @Email",
                new Dictionary<string, object>
                {
                    { "@Email", userEmail }
                }
            );

            if (userDictionaryList.Count <= 0)
                return null;

            return userDictionaryList[0]["Id"].ToString();
        }

        public async Task<int?> GetUserIdByAffiliateCode(string code)
        {
            IList<Dictionary<string, object>> userDictList = await MSSQLClient.QueryOnceAsync(
                _connection,
                @"SELECT Id
                  FROM dbo.ApplicationUser
                  WHERE AffiliateCode = @Code",
                new Dictionary<string, object>
                {
                    { "@Code", code }
                }
            );

            if (userDictList.Count <= 0)
                return null;

            return Convert.ToInt32( userDictList[0]["Id"] );
        }

        /// <summary>
        /// (Extra) Returns the user password as [string] or [null] if there is no user with the provided email.
        /// </summary>
        /// <param name="userEmail"></param>
        /// <returns></returns>
        public async Task<string> GetUserPasswordByEmailAsync(string userEmail)
        {
            IList<Dictionary<string, object>> userDictionaryList = await MSSQLClient.QueryOnceAsync(
                _connection,
                @"SELECT Password
                  FROM dbo.ApplicationUser
                  WHERE Email = @Email",
                new Dictionary<string, object>
                {
                    { "@Email", userEmail }
                }
            );

            if (userDictionaryList.Count <= 0)
                return null;

            return userDictionaryList[0]["Password"].ToString();
        }

        /// <summary>
        /// 
        /// It returns "Success" if successful or ErrorMessages.ProvidedPassDoesNotMatch/ErrorMessages.CouldNotChangePassword error message if not.
        /// 
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="currentPassword"></param>
        /// <param name="newPassword"></param>
        /// <returns></returns>
        public async Task<string> ChangePasswordAsync(string userId, string currentPassword, string newPassword)
        {
            await this._connection.OpenAsync();

            IList<Dictionary<string, object>> expectedPasswordDictList = await MSSQLClient.QueryAsync(
                _connection,
                @"SELECT Password
                  FROM dbo.ApplicationUser
                  WHERE Id = @Id",
                new Dictionary<string, object>
                {
                    { "@Id", userId }
                }
            );

            if (currentPassword != expectedPasswordDictList[0]["Password"].ToString())
            {
                this._connection.Close();
                return ErrorMessages.ProvidedPassDoesNotMatch;
            }

            int result = await MSSQLClient.CommandAsync(
                _connection,
                @"UPDATE dbo.ApplicationUser
                  SET Password = @Password
                  WHERE Id = @Id",
                new Dictionary<string, object>
                {
                    { "@Password", newPassword },
                    { "@Id", userId }
                }
            );

            if (result <= 0)
                return ErrorMessages.CouldNotChangePassword;

            return "Success";
        }

        public async Task<int> SetMaxloginFailsAsync(string userId, string maxLoginFails)
        {
            int result = await MSSQLClient.CommandOnceAsync(
                _connection,
                @"UPDATE dbo.ApplicationUserSettings
                  SET MaxLoginFailes = @MaxLoginFailes
                  WHERE id = @Id",
                new Dictionary<string, object>
                {
                    { "@MaxLoginFailes", maxLoginFails },
                    { "@Id", userId }
                }
            );

            return result;
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
