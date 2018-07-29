using System;
using System.Collections.Generic;
using System.Linq;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace Coinelity.Core
{
    public static partial class MSSQLClient
    {
        #region QUERY

        public static Task<IList<Dictionary<string, object>>> QueryAsync(SqlConnection connection, SqlCommand cmd)
        {
            return ExecuteQueryAsync(connection, cmd);
        }

        public static Task<IList<Dictionary<string, object>>> QueryAsync(SqlConnection connection, string queryString)
        {
            SqlCommand cmd = new SqlCommand(queryString, connection);
            return ExecuteQueryAsync(connection, cmd);
        }

        public static Task<IList<Dictionary<string, object>>> QueryAsync(SqlConnection connection, string queryString, Dictionary<string, object> parameters)
        {
            SqlCommand cmd = new SqlCommand(queryString, connection);
            SqlCommand parameterizedCmd = ParameterizeCommand(cmd, parameters);
            return ExecuteQueryAsync(connection, parameterizedCmd);
        }

        private static async Task<IList<Dictionary<string, object>>> ExecuteQueryAsync(SqlConnection connection, SqlCommand cmd)
        {
            try
            {
                await connection.OpenAsync();

                using (connection)
                {
                    SqlDataReader dataReader = await cmd.ExecuteReaderAsync();
                    IList<Dictionary<string, object>> recordSet = new List<Dictionary<string, object>>();

                    while (dataReader.Read())
                    {
                        recordSet.Add( GetRowAsDictionary(dataReader) );
                    }

                    return recordSet;
                }

            }
            catch (Exception e)
            {
                return new List<Dictionary<string, object>>
                {
                    new Dictionary<string, object>
                    {
                        { "Error", e.Message }
                    }
                };
            }
            finally
            {
                connection.Close();
            }
        }

        #endregion

        #region COMMAND
        public static Task<int> CommandAsync(SqlConnection connection, SqlCommand sqlCommand)
        {
            return ExecuteCommandAsync(connection, sqlCommand);
        }

        public static Task<int> CommandAsync(SqlConnection connection, string commandString)
        {
            SqlCommand cmd = new SqlCommand(commandString, connection);
            return ExecuteCommandAsync(connection, cmd);
        }

        public static Task<int> CommandAsync(SqlConnection connection, string commandString, Dictionary<string, object> parameters)
        {
            SqlCommand cmd = new SqlCommand(commandString, connection);
            SqlCommand parameterizedCmd = ParameterizeCommand(cmd, parameters);
            return ExecuteCommandAsync(connection, parameterizedCmd);
        }

        private static async Task<int> ExecuteCommandAsync(SqlConnection connection, SqlCommand cmd)
        {
            try
            {
                await connection.OpenAsync();

                using (connection)
                {
                    return await cmd.ExecuteNonQueryAsync();
                }

            }
            catch (Exception e)
            {
                Console.WriteLine(e.ToString());
                return -1;
            }
            finally
            {
                connection.Close();
            }
        }

        #endregion
    }
}
