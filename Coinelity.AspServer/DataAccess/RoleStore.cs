using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using System.Data.SqlClient;
using Coinelity.AspServer.Models;
using System.Threading;
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

            int success = await MSSQLClient.CommandAsync(_connection,
                $@"INSERT INTO dbo.ApplicationRole (Name)
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

        public Task<IList<Dictionary<string, object>>> GetUserRoles(string userId)
        {
            //return await MSSQLClient.QueryAsync(_connection,
            //    $@"SELECT dbo.ApplicationRole.Name"
            //);
            throw new NotImplementedException();
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
