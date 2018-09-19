/*********************************************************************************************
 *
 * Copyright (c) 2018 Jo�o Pedro Martins Neves <joao95neves@gmail.com> - All Rights Reserved
 * Unauthorized copying/remixing/sharing of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Jo�o Pedro Martins Neves <joao95neves@gmail.com>, Portugal, CIVIL ID: 14298812
 *
 *********************************************************************************************/

using System;
using System.Linq;
using System.Collections.Generic;
using System.Text;

namespace Coinelity.Core
{
    public static class Utils
    {
        public static List<T> ToObjectList<T>(IList<Dictionary<string, object>> listDictionaries) where T : class
        {
            List<T> objectList = new List<T>();

            for (byte i = 0; i < listDictionaries.Count; ++i)
            {
                objectList.Add( ToObject<T>(listDictionaries[i]) );
            }

            return objectList;
        }

        public static T ToObject<T>(IList<Dictionary<string, object>> listDictionaries) where T : class
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

        public static T ToObject<T>(Dictionary<string, object> dictionary)
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
    }
}
