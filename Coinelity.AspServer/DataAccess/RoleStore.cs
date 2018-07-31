using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using System.Data.SqlClient;
using Coinelity.AspServer.Models;
using System.Threading;
using Coinelity.AspServer.DataAccess;
using Coinelity.Core;
using Coinelity.Core.Data;

namespace Coinelity.AspServer.DataAccess
{
    public class RoleStore : IRoleStore<ApplicationRole>
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

            int success = await MSSQLClient.CommandAsync(
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

        // TODO: Change to string.
        public async Task<List<ApplicationRoleDTO>> GetUserRolesByUserIdAsync(string userId)
        {
            IList<Dictionary<string, object>> userRolesDictionaryList = await MSSQLClient.QueryAsync(
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
