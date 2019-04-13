/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

using System;
using System.Collections.Generic;
using System.Linq;
using System.Data.SqlClient;
using Coinelity.Core.Models;


namespace Coinelity.Core.Data
{
    public static partial class MSSQLClient
    {
        public static SqlConnection Create( string serverName, string databaseName, string userId, string password )
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
        /// Executes a query on the provided opened connection async. NOTE: The method doesn't open or close the connection (no disposing control).
        /// 
        /// </summary>
        /// <param name="connection"> Opened connection </param>
        /// <param name="cmd"></param>
        /// <returns></returns>
        public static SQLClientResult Query( SqlCommand cmd )
        {
            return ExecuteQuery( cmd );
        }

        /// <summary>
        /// 
        /// <para>Executes a syncronous query on the provided opened connection.</para>
        /// <para>
        /// NOTES:
        /// The method does not close the connection when finished.
        /// This overload does not use parameterized commands, so be aware of potential SQL injections
        /// (To be use only for queries like: "SELECT TOP 10 Id FROM Users").
        /// </para>
        /// 
        /// </summary>
        /// <param name="connection"></param>
        /// <param name="queryString"></param>
        /// <returns></returns>
        public static SQLClientResult Query( SqlConnection connection, string queryString )
        {
            SqlCommand cmd = new SqlCommand( queryString, connection );
            return ExecuteQuery( cmd );
        }

        public static SQLClientResult Query( SqlConnection connection, string queryString, Dictionary<string, object> parameters )
        {
            SqlCommand parameterizedCmd = ParameterizeCommand( connection, queryString, parameters );
            return ExecuteQuery( parameterizedCmd );
        }

        /// <summary>
        /// 
        /// Makes a query on the provided DB connection. NOTE: It opens and closes the connection when finished.
        /// 
        /// </summary>
        /// <param name="connection"></param>
        /// <param name="cmd"></param>
        /// <returns></returns>
        public static SQLClientResult QueryOnce( SqlConnection connection, SqlCommand cmd )
        {
            return ExecuteQueryOnce( connection, cmd );
        }

        /// <summary>
        /// 
        /// <para>Execute a syncronous query once on the provided opened connection.</para>
        /// <para>
        /// NOTES:
        /// The method opens and closes the connection when finished.
        /// This overload does not use parameterized commands, so be aware of potential SQL injections
        /// (To be use only for queries like: "SELECT TOP 10 Id FROM Users").
        /// </para>
        /// 
        /// </summary>
        /// <param name="connection"></param>
        /// <param name="queryString"></param>
        /// <returns></returns>
        public static SQLClientResult QueryOnce( SqlConnection connection, string queryString )
        {
            SqlCommand cmd = new SqlCommand( queryString, connection );
            return ExecuteQueryOnce( connection, cmd );
        }

        public static SQLClientResult QueryOnce( SqlConnection connection, string queryString, Dictionary<string, object> parameters )
        {
            SqlCommand parameterizedCmd = ParameterizeCommand( connection, queryString, parameters );
            return ExecuteQueryOnce( connection, parameterizedCmd );
        }

        private static SQLClientResult ExecuteQueryOnce( SqlConnection connection, SqlCommand cmd )
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
                SQLClientResult sqlClientResult = new SQLClientResult( e );
                sqlClientResult.Freeze();
                return sqlClientResult;
            }
            finally
            {
                cmd.Dispose();
                connection.Close();
            }
        }

        private static SQLClientResult ExecuteQuery( SqlCommand cmd )
        {
            try
            {
                SqlDataReader dataReader = cmd.ExecuteReader();
                IList<Dictionary<string, object>> recordSet = new List<Dictionary<string, object>>();

                while (dataReader.Read())
                {
                    recordSet.Add( GetRowAsDictionary( dataReader ) );
                }

                SQLClientResult sqlClientResult = new SQLClientResult( recordSet );
                sqlClientResult.Freeze();
                return sqlClientResult;

            }
            catch (Exception e)
            {
                SQLClientResult sqlClientResult = new SQLClientResult( e );
                sqlClientResult.Freeze();
                return sqlClientResult;
            }
        }


        private static Dictionary<string, object> GetRowAsDictionary( SqlDataReader reader )
        {
            Dictionary<string, object> row = new Dictionary<string, object>();

            for (int i = 0; i < reader.FieldCount; ++i)
            {
                row.Add( reader.GetName( i ), reader[i] );
            }

            return row;
        }

        #endregion

        #region COMMAND

        /// <summary>
        /// 
        /// Executes a query on the provided DB connection. NOTE: The method doesn't open or close the connection (no disposing control).
        /// 
        /// </summary>
        /// <param name="connection"></param>
        /// <param name="cmd"></param>
        /// <returns></returns>
        public static SQLClientResult Command( SqlCommand sqlCommand )
        {
            return ExecuteCommand( sqlCommand );
        }

        public static SQLClientResult Command( SqlConnection connection, string commandString )
        {
            SqlCommand cmd = new SqlCommand( commandString, connection );
            return ExecuteCommand( cmd );
        }

        public static SQLClientResult Command( SqlConnection connection, string commandString, Dictionary<string, object> parameters )
        {
            SqlCommand parameterizedCmd = ParameterizeCommand( connection, commandString, parameters );
            return ExecuteCommand( parameterizedCmd );
        }

        /// <summary>
        /// 
        /// Executes a query once on the provided DB connection. NOTE: In the end it closes the connection.
        /// 
        /// </summary>
        /// <param name="connection"></param>
        /// <param name="cmd"></param>
        /// <returns></returns>
        public static SQLClientResult CommandOnce( SqlConnection connection, SqlCommand sqlCommand )
        {
            return ExecuteCommandOnce( connection, sqlCommand );
        }

        public static SQLClientResult CommandOnce( SqlConnection connection, string commandString )
        {
            SqlCommand cmd = new SqlCommand( commandString, connection );
            return ExecuteCommandOnce( connection, cmd );
        }

        public static SQLClientResult CommandOnce( SqlConnection connection, string commandString, Dictionary<string, object> parameters )
        {
            SqlCommand parameterizedCmd = ParameterizeCommand( connection, commandString, parameters );
            return ExecuteCommandOnce( connection, parameterizedCmd );
        }

        private static SQLClientResult ExecuteCommand( SqlCommand cmd )
        {
            try
            {
                SQLClientResult sqlClientResult = new SQLClientResult( null, cmd.ExecuteNonQuery() );
                sqlClientResult.Freeze();
                return sqlClientResult;
            }
            catch (Exception e)
            {
                Console.WriteLine( e.ToString() );
                SQLClientResult sqlClientResult = new SQLClientResult( e );
                sqlClientResult.Freeze();
                return sqlClientResult;
            }
        }

        private static SQLClientResult ExecuteCommandOnce( SqlConnection connection, SqlCommand cmd )
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
                Console.WriteLine( e.Message );
                SQLClientResult sqlClientResult = new SQLClientResult( e );
                sqlClientResult.Freeze();
                return sqlClientResult;
            }
            finally
            {
                cmd.Dispose();
                connection.Close();
            }
        }
        #endregion

        public static readonly string LastInsertedIDQueryStr = "SELECT SCOPE_IDENTITY()";

        public static object GetLastInsertedID( SqlConnection _connection )
        {
            SQLClientResult sqlClientResult = MSSQLClient.Query( _connection, MSSQLClient.LastInsertedIDQueryStr );
            return sqlClientResult.QueryResult[0].First().Value;
        }

        public static object GetLastInsertedIDOnce( SqlConnection _connection )
        {
            SQLClientResult sqlClientResult = MSSQLClient.QueryOnce( _connection, MSSQLClient.LastInsertedIDQueryStr );
            return sqlClientResult.QueryResult[0].First().Value;
        }

        public static SqlCommand ParameterizeCommand( SqlConnection connection, string commandString, Dictionary<string, object> parameters )
        {
            SqlCommand cmd = new SqlCommand( commandString, connection );

            for (int i = 0; i < parameters.Count; i++)
            {
                string parameterName = parameters.Keys.ElementAt( i );
                cmd.Parameters.AddWithValue( parameterName, parameters[parameterName] );
            }

            return cmd;
        }
    }
}
