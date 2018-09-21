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

namespace Coinelity.Core.Data
{
    public static partial class MSSQLClient
    {
        public static SqlConnection Create(string serverName, string databaseName, string userId, string password)
        {
            SqlConnectionStringBuilder connectionBuilder = new SqlConnectionStringBuilder();
            connectionBuilder.DataSource = serverName;
            connectionBuilder.InitialCatalog = databaseName;
            connectionBuilder.UserID = userId;
            connectionBuilder.Password = password;

            return new SqlConnection( connectionBuilder.ConnectionString );
        }

        #region QUERY

        /// <summary>
        /// 
        /// Makes a query on the provided DB connection. NOTE: It opens and closes the connection when finished.
        /// 
        /// </summary>
        /// <param name="connection"></param>
        /// <param name="cmd"></param>
        /// <returns></returns>
        public static IList<Dictionary<string, object>> QueryOnce(SqlConnection connection, SqlCommand cmd)
        {
            return ExecuteQueryOnce(connection, cmd);
        }

        public static IList<Dictionary<string, object>> QueryOnce(SqlConnection connection, string queryString)
        {
            SqlCommand cmd = new SqlCommand(queryString, connection);
            return ExecuteQueryOnce(connection, cmd);
        }

        public static IList<Dictionary<string, object>> QueryOnce(SqlConnection connection, string queryString, Dictionary<string, object> parameters)
        {
            SqlCommand parameterizedCmd = ParameterizeCommand(connection, queryString, parameters);
            return ExecuteQueryOnce(connection, parameterizedCmd);
        }

        private static IList<Dictionary<string, object>> ExecuteQueryOnce(SqlConnection connection, SqlCommand cmd)
        {
            try
            {
                connection.Open();

                using (connection)
                {
                    return ExecuteQuery( cmd );
                }

            }
            catch (Exception e)
            {
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
        /// Executes a query on the provided opened connection async. NOTE: The method doesn't open or close the connection (no disposing control).
        /// 
        /// </summary>
        /// <param name="connection"> Opened connection </param>
        /// <param name="cmd"></param>
        /// <returns></returns>
        public static IList<Dictionary<string, object>> Query(SqlCommand cmd)
        {
            return ExecuteQuery( cmd );
        }

        public static IList<Dictionary<string, object>> Query(SqlConnection connection, string queryString)
        {
            SqlCommand cmd = new SqlCommand(queryString, connection);
            return ExecuteQuery( cmd );
        }

        public static IList<Dictionary<string, object>> Query(SqlConnection connection, string queryString, Dictionary<string, object> parameters)
        {
            SqlCommand parameterizedCmd = ParameterizeCommand(connection, queryString, parameters);
            return ExecuteQuery( parameterizedCmd );
        }

        private static IList<Dictionary<string, object>> ExecuteQuery(SqlCommand cmd)
        {
            try
            {
                SqlDataReader dataReader = cmd.ExecuteReader();
                IList<Dictionary<string, object>> recordSet = new List<Dictionary<string, object>>();

                while (dataReader.Read())
                {
                    recordSet.Add( GetRowAsDictionary(dataReader) );
                }

                return recordSet;

            }
            catch (Exception e)
            {
                return ReturnErrorMessageObject( e );
            }
        }

        private static Dictionary<string, object> GetRowAsDictionary(SqlDataReader reader)
        {
            Dictionary<string, object> row = new Dictionary<string, object>();

            for (int i = 0; i < reader.FieldCount; ++i)
            {
                row.Add(reader.GetName(i), reader[i]);
            }

            return row;
        }

        private static IList<Dictionary<string, object>> ReturnErrorMessageObject(Exception e)
        {
            return new List<Dictionary<string, object>>
                {
                    new Dictionary<string, object>
                    {
                        { "Error", e.Message }
                    }
                };
        }

        #endregion

        #region COMMAND

        /// <summary>
        /// 
        /// Executes a query once on the provided DB connection. NOTE: In the end it closes the connection.
        /// 
        /// </summary>
        /// <param name="connection"></param>
        /// <param name="cmd"></param>
        /// <returns></returns>
        public static int CommandOnce(SqlConnection connection, SqlCommand sqlCommand)
        {
            return ExecuteCommandOnce(connection, sqlCommand);
        }

        public static int CommandOnce(SqlConnection connection, string commandString)
        {
            SqlCommand cmd = new SqlCommand(commandString, connection);
            return ExecuteCommandOnce(connection, cmd);
        }

        public static int CommandOnce(SqlConnection connection, string commandString, Dictionary<string, object> parameters)
        {
            SqlCommand parameterizedCmd = ParameterizeCommand(connection, commandString, parameters);
            return ExecuteCommandOnce(connection, parameterizedCmd);
        }

        private static int ExecuteCommandOnce(SqlConnection connection, SqlCommand cmd)
        {
            try
            {
                connection.Open();

                using (connection)
                {
                    return ExecuteCommand( cmd );
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.ToString());
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
        /// Executes a query on the provided DB connection. NOTE: The method doesn't open or close the connection (no disposing control).
        /// 
        /// </summary>
        /// <param name="connection"></param>
        /// <param name="cmd"></param>
        /// <returns></returns>
        public static int Command(SqlCommand sqlCommand)
        {
            return ExecuteCommand( sqlCommand );
        }

        public static int Command(SqlConnection connection, string commandString)
        {
            SqlCommand cmd = new SqlCommand(commandString, connection);
            return ExecuteCommand( cmd );
        }

        public static int Command(SqlConnection connection, string commandString, Dictionary<string, object> parameters)
        {
            SqlCommand parameterizedCmd = ParameterizeCommand(connection, commandString, parameters);
            return ExecuteCommand( parameterizedCmd );
        }

        private static int ExecuteCommand(SqlCommand cmd)
        {
            try
            {
                return cmd.ExecuteNonQuery();

            }
            catch (Exception e)
            {
                Console.WriteLine(e.ToString());
                return -1;
            }
        }

        #endregion

        public static SqlCommand ParameterizeCommand(SqlConnection connection, string commandString, Dictionary<string, object> parameters)
        {
            SqlCommand cmd = new SqlCommand(commandString, connection);

            for (int i = 0; i < parameters.Count; i++)
            {
                string parameterName = parameters.Keys.ElementAt(i);
                cmd.Parameters.AddWithValue(parameterName, parameters[parameterName]);
            }

            return cmd;
        }

        public static object GetLastInsertedIDOnce(SqlConnection _connection)
        {
            IList<Dictionary<string, object>> userIdResponse = MSSQLClient.QueryOnce(_connection, "SELECT SCOPE_IDENTITY()");
            return userIdResponse[0].First().Value;
        }

        public static object GetLastInsertedID(SqlConnection _connection)
        {
            IList<Dictionary<string, object>> userIdResponse = MSSQLClient.Query(_connection, "SELECT SCOPE_IDENTITY()");
            return userIdResponse[0].First().Value;
        }
    }
}
