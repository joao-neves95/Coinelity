using System;
using System.Linq;
using System.Collections.Generic;
using System.Text;

namespace Coinelity.Core
{
    public static class Utils
    {
        public static T GetObject<T>(IList<Dictionary<string, object>> listDictionaries) where T : class
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

        public static T GetObject<T>(Dictionary<string, object> dictionary)
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
