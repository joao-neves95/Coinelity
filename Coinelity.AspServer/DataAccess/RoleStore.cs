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
using System.Threading;
using System.Threading.Tasks;
using System.Data.SqlClient;
using Microsoft.AspNetCore.Identity;
using Coinelity.AspServer.Models;
using Coinelity.Core;
using Coinelity.Core.Data;

namespace Coinelity.AspServer.DataAccess
{
    public class RoleStore : IDisposable, IRoleStore<ApplicationRole>
    {
        private readonly SqlConnection _connection;

        public RoleStore()
        {
            this._connection = Env.GetMSSQLConnection();
        }

        public void Dispose()
        {
            GC.SuppressFinalize( this );
        }

        ~RoleStore()
        {
            Dispose();
        }

        public async Task<IdentityResult> CreateAsync(ApplicationRole role, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            int success = await MSSQLClient.CommandOnceAsync(
                _connection,
                @"INSERT INTO dbo.ApplicationRole (Name)
                   VALUES (@RoleName)",
                new Dictionary<string, object>
                {
                    { "@RoleName", role.Name }
                }
            );

            if (success <= 0)
                return IdentityResult.Failed();

            return IdentityResult.Success;
        }

        public async Task<List<ApplicationRoleDTO>> GetUserRolesByUserEmailAsync(string userEmail)
        {
            UserStore userStore = new UserStore();
            string userId = await userStore.GetUserIdByEmailAsync( userEmail );
            userStore.Dispose();

            return await GetUserRolesByUserIdAsync( userId );
        }

        // TODO: Change to string[].
        public async Task<List<ApplicationRoleDTO>> GetUserRolesByUserIdAsync(string userId)
        {
            IList<Dictionary<string, object>> userRolesDictionaryList = await MSSQLClient.QueryOnceAsync(
                _connection,
                @"SELECT dbo.ApplicationRole.Name AS RoleName
                  FROM dbo.ApplicationRole
                      INNER JOIN dbo.ApplicationUserRoles
                      ON dbo.ApplicationRole.Id = dbo.ApplicationUserRoles.RoleId
                      WHERE dbo.ApplicationUserRoles.UserId = @UserId",
                new Dictionary<string, object>
                {
                    { "@UserId", userId }
                }
            );

            return Utils.ToObjectList<ApplicationRoleDTO>( userRolesDictionaryList );
        }

        public Task<IdentityResult> DeleteAsync(ApplicationRole role, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<ApplicationRole> FindByIdAsync(string roleId, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<ApplicationRole> FindByNameAsync(string normalizedRoleName, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<string> GetNormalizedRoleNameAsync(ApplicationRole role, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<string> GetRoleIdAsync(ApplicationRole role, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<string> GetRoleNameAsync(ApplicationRole role, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task SetNormalizedRoleNameAsync(ApplicationRole role, string normalizedName, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task SetRoleNameAsync(ApplicationRole role, string roleName, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public Task<IdentityResult> UpdateAsync(ApplicationRole role, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
