using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data.SqlClient;
using Coinelity.Core.Data;
using Coinelity.AspServer.Models;

namespace Coinelity.AspServer.DataAccess
{
    public class AuditLogStore : IDisposable
    {
        private readonly SqlConnection _connection;

        public AuditLogStore(bool createConnection = true)
        {
            this._connection = createConnection ? Env.GetMSSQLConnection() : null;
        }

        public void Dispose()
        {
            GC.SuppressFinalize( this );
        }

        ~AuditLogStore()
        {
            this.Dispose();
        }

        public Task InsertNewLog(int userId, EventType eventType, string userIp)
        {
            return MSSQLClient.CommandOnceAsync( _connection,
                $@"INSERT INTO dbo.AuditLog (UserId, EventTypeId, UserIP)
                   VALUES ({userId}, ${eventType}, @UserIp)",
                new Dictionary<string, object>
                {
                    { "@UserIp", userIp }
                }
            );
        }
    }
}
