﻿/*
 *
 * Copyright (c) 2018 João Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved.
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * The EULA is located in the root of this project, under the name "LICENSE.md".
 * Written by João Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812.
 *
 */

using System;
using System.Text;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace Coinelity.Core
{
    public static class Utils
    {
        #region EXTENSIONS

        public static string ToJSON(this object obj)
        {
            return JsonConvert.SerializeObject( obj, Formatting.Indented );
        }

        public static List<T> ToObjectList<T>(this IList<Dictionary<string, object>> listDictionaries) where T : class
        {
            List<T> objectList = new List<T>();

            for (byte i = 0; i < listDictionaries.Count; ++i)
            {
                objectList.Add( ToObject<T>(listDictionaries[i]) );
            }

            return objectList;
        }

        public static T ToObject<T>(this IList<Dictionary<string, object>> listDictionaries) where T : class
        {
            Type type = typeof(T);
            T obj = Activator.CreateInstance( type ) as T;

            for (int i = 0; i < listDictionaries.Count; ++i)
            {
                foreach (var kv in listDictionaries[i])
                {
                    object val = null;
                    Type valueType = type.GetProperty( kv.Key ).PropertyType;

                    if (valueType.IsGenericType && valueType.GetGenericTypeDefinition() == typeof(Nullable<>))
                    {
                        if (kv.Value == null || kv.Value is DBNull || kv.Value == DBNull.Value)
                            val = null;
                        else
                            Convert.ChangeType(kv.Value, Nullable.GetUnderlyingType( valueType ));
                    }
                    else
                        val = Convert.ChangeType(kv.Value, valueType);

                    type.GetProperty(kv.Key).SetValue(obj, val);
                }
            }
            return (T)obj;
        }

        public static T ToObject<T>(this Dictionary<string, object> dictionary)
        {
            Type type = typeof(T);
            var obj = Activator.CreateInstance(type);

            foreach (var kv in dictionary)
            {
                object val = null;
                Type valueType = type.GetProperty(kv.Key).PropertyType;

                if (valueType.IsGenericType && valueType.GetGenericTypeDefinition() == typeof(Nullable<>))
                {
                    if (kv.Value == null || kv.Value is DBNull || kv.Value == DBNull.Value)
                        val = null;
                    else
                        Convert.ChangeType(kv.Value, Nullable.GetUnderlyingType(valueType));
                }
                else
                    val = Convert.ChangeType(kv.Value, valueType);

                type.GetProperty(kv.Key).SetValue(obj, val);
            }

            return (T)obj;
        }

        #endregion

        public static readonly string alphaNum = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

        public static int RandomInt(int min = 0, int max = 100)
        {
            return new Random().Next( min, max );
        }

        public static string RandomAlphaNumeric(uint size = 5)
        {
            StringBuilder result = new StringBuilder( (int)size );

            for (uint i = 0; i <= size; ++i)
            {
                result.Append( Utils.alphaNum[Utils.RandomInt( 0, 62 )] );
            }

            return result.ToString();
        }
    }
}
