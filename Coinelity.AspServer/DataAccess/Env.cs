using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Coinelity.Core.Data;

namespace Coinelity.AspServer.DataAccess
{
    public static class Env
    {
        public static SqlConnection GetMSSQLConnection()
        {
            return MSSQLClient.Create(
                DotNetEnv.Env.GetString("MSSQL_SERVERNAME"),
                DotNetEnv.Env.GetString("MSSQL_DATABASENAME"),
                DotNetEnv.Env.GetString("MSSQL_ADMIN_LOGIN"),
                DotNetEnv.Env.GetString("MSSQL_ADMIN_PASS")
            );
        }
    }
}
