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

        public static IList<Dictionary<string, object>> Query(SqlConnection connection, SqlCommand cmd)
        {
            return ExecuteQuery(connection, cmd);
        }

        public static IList<Dictionary<string, object>> Query(SqlConnection connection, string queryString)
        {
            SqlCommand cmd = new SqlCommand(queryString, connection);
            return ExecuteQuery(connection, cmd);
        }

        public static IList<Dictionary<string, object>> Query(SqlConnection connection, string queryString, Dictionary<string, object> parameters)
        {
            SqlCommand parameterizedCmd = ParameterizeCommand(connection, queryString, parameters);
            return ExecuteQuery(connection, parameterizedCmd);
        }

        private static IList<Dictionary<string, object>> ExecuteQuery(SqlConnection connection, SqlCommand cmd)
        {
            try
            {
                connection.Open();

                using (connection)
                {
                    SqlDataReader dataReader = cmd.ExecuteReader();
                    IList<Dictionary<string, object>> recordSet = new List<Dictionary<string, object>>();

                    while(dataReader.Read())
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
                cmd.Dispose();
                connection.Close();
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

        #endregion

        #region COMMAND
        public static int Command(SqlConnection connection, SqlCommand sqlCommand)
        {
            return ExecuteCommand(connection, sqlCommand);
        }

        public static int Command(SqlConnection connection, string commandString)
        {
            SqlCommand cmd = new SqlCommand(commandString, connection);
            return ExecuteCommand(connection, cmd);
        }

        public static int Command(SqlConnection connection, string commandString, Dictionary<string, object> parameters)
        {
            SqlCommand parameterizedCmd = ParameterizeCommand(connection, commandString, parameters);
            return ExecuteCommand(connection, parameterizedCmd);
        }

        private static int ExecuteCommand(SqlConnection connection, SqlCommand cmd)
        {
            try
            {
                connection.Open();
                using (connection)
                {
                    return cmd.ExecuteNonQuery();
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

        public static object GetLastInsertedID(SqlConnection _connection)
        {
            IList<Dictionary<string, object>> userIdResponse = MSSQLClient.Query(_connection, "SELECT SCOPE_IDENTITY()");
            return userIdResponse[0].First().Value;
        }
    }
}
