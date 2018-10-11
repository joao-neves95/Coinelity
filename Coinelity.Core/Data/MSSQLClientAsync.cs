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
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace Coinelity.Core.Data
{
	///
	/// <summary>
	///
	/// There is no big important diferences between using non-control disposing or Once methods because of SQL Server Connection Pooling (ADO.NET).
	/// See: https://docs.microsoft.com/en-us/dotnet/framework/data/adonet/sql-server-connection-pooling
	///
	/// </summary>
    public static partial class MSSQLClient
    {
        #region QUERY

        /// <summary>
        /// 
        /// Execute an asyncronous query once on the provided opened connection. NOTE: The method opens and closes the connection when finished.
        /// 
        /// </summary>
        /// <param name="connection"> Opened connection </param>
        /// <param name="cmd"></param>
        /// <returns></returns>
        public static Task<IList<Dictionary<string, object>>> QueryOnceAsync(SqlConnection connection, SqlCommand cmd)
        {
            return ExecuteQueryOnceAsync(connection, cmd);
        }

        public static Task<IList<Dictionary<string, object>>> QueryOnceAsync(SqlConnection connection, string queryString)
        {
            SqlCommand cmd = new SqlCommand(queryString, connection);
            return ExecuteQueryOnceAsync(connection, cmd);
        }

        public static Task<IList<Dictionary<string, object>>> QueryOnceAsync(SqlConnection connection, string queryString, Dictionary<string, object> parameters)
        {
            SqlCommand parameterizedCmd = ParameterizeCommand(connection, queryString, parameters);
            return ExecuteQueryOnceAsync(connection, parameterizedCmd);
        }


        private static async Task<IList<Dictionary<string, object>>> ExecuteQueryOnceAsync(SqlConnection connection, SqlCommand cmd)
        {
            try
            {
                await connection.OpenAsync();

                using (connection)
                {
                    return await ExecuteQueryAsync( cmd );
                }

            }
            catch (Exception e)
            {
                // TODO: Exception handling.
                return ReturnErrorMessageObject( e );
            }
            finally
            {
                cmd.Dispose();
                connection.Close();
            }
        }

        /// <summary>
        /// 
        /// Execute an asyncronous query on the provided opened connection. NOTE: The method doesn't open or close the connection (no disposing control).
        /// 
        /// </summary>
        /// <param name="connection"> Opened connection </param>
        /// <param name="cmd"></param>
        /// <returns></returns>
        public static Task<IList<Dictionary<string, object>>> QueryAsync(SqlConnection connection, SqlCommand cmd)
        {
            return ExecuteQueryAsync( cmd );
        }

        public static Task<IList<Dictionary<string, object>>> QueryAsync(SqlConnection connection, string queryString)
        {
            SqlCommand cmd = new SqlCommand(queryString, connection);
            return ExecuteQueryAsync( cmd );
        }

        public static Task<IList<Dictionary<string, object>>> QueryAsync(SqlConnection connection, string queryString, Dictionary<string, object> parameters)
        {
            SqlCommand parameterizedCmd = ParameterizeCommand(connection, queryString, parameters);
            return ExecuteQueryAsync( parameterizedCmd );
        }

        private static async Task<IList<Dictionary<string, object>>> ExecuteQueryAsync(SqlCommand cmd)
        {
            try
            {
                SqlDataReader dataReader = await cmd.ExecuteReaderAsync();
                IList<Dictionary<string, object>> recordSet = new List<Dictionary<string, object>>();

                while (dataReader.Read())
                {
                    recordSet.Add(GetRowAsDictionary(dataReader));
                }

                return recordSet;

            }
            catch (Exception e)
            {
                // TODO: Exception handling.
                return ReturnErrorMessageObject( e );
            }
        }

        #endregion

        #region COMMAND

        /// <summary>
        /// 
        /// Executes an asyncronous non-query command on the provided non-opened connection. NOTE: The method opens and closes the connection when finished.
        /// 
        /// </summary>
        /// <param name="connection"></param>
        /// <param name="sqlCommand"></param>
        /// <returns></returns>
        public static Task<int> CommandOnceAsync(SqlConnection connection, SqlCommand sqlCommand)
        {
            return ExecuteCommandOnceAsync(connection, sqlCommand);
        }

        public static Task<int> CommandOnceAsync(SqlConnection connection, string commandString)
        {
            SqlCommand cmd = new SqlCommand(commandString, connection);
            return ExecuteCommandOnceAsync(connection, cmd);
        }

        public static Task<int> CommandOnceAsync(SqlConnection connection, string commandString, Dictionary<string, object> parameters)
        {
            SqlCommand parameterizedCmd = ParameterizeCommand(connection, commandString, parameters);
            return ExecuteCommandOnceAsync(connection, parameterizedCmd);
        }

        private static async Task<int> ExecuteCommandOnceAsync(SqlConnection connection, SqlCommand cmd)
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
                Console.WriteLine( e.Message );
                return -1;
            }
            finally
            {
                cmd.Dispose();
                connection.Close();
            }
        }

        /// <summary>
        /// 
        /// Executes an asyncronous non-query command on the provided opened connection. NOTE: The method doesn't open or close the connection (no disposing control).
        /// 
        /// <para />
        /// 
        /// It returns an int with the number of changed rows, or -1 in case of error.
        /// 
        /// </summary>
        /// <param name="connection"></param>
        /// <param name="sqlCommand"></param>
        /// <returns></returns>
        public static Task<int> CommandAsync(SqlCommand sqlCommand)
        {
            return ExecuteCommandAsync( sqlCommand );
        }

        public static Task<int> CommandAsync(SqlConnection connection, string commandString)
        {
            SqlCommand cmd = new SqlCommand(commandString, connection);
            return ExecuteCommandAsync( cmd );
        }

        public static Task<int> CommandAsync(SqlConnection connection, string commandString, Dictionary<string, object> parameters)
        {
            SqlCommand parameterizedCmd = ParameterizeCommand(connection, commandString, parameters);
            return ExecuteCommandAsync( parameterizedCmd );
        }

        private static async Task<int> ExecuteCommandAsync(SqlCommand cmd)
        {
            try
            {
                return await cmd.ExecuteNonQueryAsync();

            }
            catch (Exception e)
            {
                // TODO: Exception handling.
                Console.WriteLine( e.Message );
                return -1;
            }
        }

        #endregion

        #region TRANSACTION

        /// <summary>
        /// 
        /// </summary>
        /// <param name="connection"></param>
        /// <param name="sqlCommands"> Use MSSQLClient.ParameterizeCommand() </param>
        /// <returns></returns>
        public static async Task<bool> NonQueryTransactionOnceAsync(SqlConnection connection, SqlCommand[] sqlCommands)
        {
            try
            {
                await connection.OpenAsync();

                using (connection)
                {
                    return await NonQueryTransactionAsync(connection, sqlCommands);
                }
            }
            catch (Exception e)
            {
                // TODO: Exception handling.
                Console.WriteLine( e.Message );
                return false;
            }
            finally
            {
                connection.Close();
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="connection"></param>
        /// <param name="sqlCommands"> Use MSSQLClient.ParameterizeCommand() </param>
        /// <returns></returns>
        public static async Task<bool> NonQueryTransactionAsync(SqlConnection connection, SqlCommand[] sqlCommands)
        {
            try
            {
                SqlTransaction transaction = connection.BeginTransaction();

                try
                {
                    for (int i = 0; i < sqlCommands.Length; ++i)
                    {
                        sqlCommands[i].Transaction = transaction;
                        await sqlCommands[i].ExecuteNonQueryAsync();
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
                    for (int i = 0; i < sqlCommands.Length; ++i)
                    {
                        sqlCommands[i].Dispose();
                    }

                    transaction.Dispose();
                }
            }
            catch (Exception e)
            {
                // TODO: Exception handling.
                Console.WriteLine(e.Message);
                return false;
            }
        }

        #endregion

        public static async Task<object> GetLastInsertedIDOnceAsync(SqlConnection _connection)
        {
            IList<Dictionary<string, object>> userIdResponse = await MSSQLClient.QueryOnceAsync(_connection, "SELECT SCOPE_IDENTITY()");
            return userIdResponse[0].First().Value;
        }

        public static async Task<object> GetLastInsertedIDAsync(SqlConnection _connection)
        {
            IList<Dictionary<string, object>> userIdResponse = await MSSQLClient.QueryAsync(_connection, "SELECT SCOPE_IDENTITY()");
            return userIdResponse[0].First().Value;
        }
    }
}
