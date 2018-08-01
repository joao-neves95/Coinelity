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
        public const int MinPasswordLen = 8;

        public static SqlConnection GetMSSQLConnection()
        {
            // Local database:
            //
            return MSSQLClient.Create(
                DotNetEnv.Env.GetString( "MSSQL_INSTANCE" ),
                DotNetEnv.Env.GetString( "MSSQL_LOCALDATABASENAME" ),
                DotNetEnv.Env.GetString( "MSSQL_USER" ),
                DotNetEnv.Env.GetString( "MSSQL_PASS" )
            );

            // Azure Production SQL Server database:
            //
            //return MSSQLClient.Create(
            //    DotNetEnv.Env.GetString( "MSSQL_SERVERNAME" ),
            //    DotNetEnv.Env.GetString( "MSSQL_DATABASENAME" ),
            //    DotNetEnv.Env.GetString( "MSSQL_ADMIN_LOGIN" ),
            //    DotNetEnv.Env.GetString( "MSSQL_ADMIN_PASS" )
            //);
        }
    }
}
