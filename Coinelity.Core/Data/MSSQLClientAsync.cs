using System;
using System.Collections.Generic;
using System.Linq;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace Coinelity.Core.Data
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
            SqlCommand parameterizedCmd = ParameterizeCommand(connection, queryString, parameters);
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
                // TODO: Exception handling.
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
                cmd.Dispose();
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
            SqlCommand parameterizedCmd = ParameterizeCommand(connection, commandString, parameters);
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
                // TODO: Exception handling.
                Console.WriteLine(e.Message);
                return -1;
            }
            finally
            {
                cmd.Dispose();
                connection.Close();
            }
        }

        #endregion

        #region TRANSACTION

        public static async Task<bool> NonQueryTransactionAsync(SqlConnection connection, SqlCommand[] sqlCommands)
        {
            try
            {
                await connection.OpenAsync();

                using(connection)
                {
                    SqlTransaction transaction = connection.BeginTransaction();

                    try
                    {
                        for (int i = 0; i < sqlCommands.Length; ++i)
                        {
                            sqlCommands[i].Transaction = transaction;
                            await sqlCommands[i].ExecuteNonQueryAsync();
                            sqlCommands[i].Dispose();
                        }

                        transaction.Commit();
                        return true;
                    }
                    catch (Exception e)
                    {
                        // TODO: Exception handling.
                        Console.WriteLine(e.Message);

                        // Attempt to roll back the transaction.
                        try
                        {
                            transaction.Rollback();
                            return false;
                        }
                        catch (Exception ex2)
                        {
                            // TODO: Exception handling.
                            // This catch block will handle any errors that may have occurred
                            // on the server that would cause the rollback to fail, such as
                            // a closed connection.
                            Console.WriteLine("Rollback Exception Type: {0}", ex2.GetType());
                            Console.WriteLine("  Message: {0}", ex2.Message);
                            return false;
                        }
                    }
                    finally
                    {
                        transaction.Dispose();
                    }
                }

            }
            catch (Exception e)
            {
                // TODO: Exception handling.
                Console.WriteLine(e.Message);
                return false;
            }
            finally
            {
                connection.Close();
            }
        }

        #endregion

        public static async Task<object> GetLastInsertedIDAsync(SqlConnection _connection)
        {
            IList<Dictionary<string, object>> userIdResponse = await MSSQLClient.QueryAsync(_connection, "SELECT SCOPE_IDENTITY()");
            return userIdResponse[0].First().Value;
        }
    }
}
