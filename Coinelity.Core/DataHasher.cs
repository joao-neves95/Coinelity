using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using Isopoh.Cryptography.Argon2;
using Isopoh.Cryptography.SecureArray;

namespace Coinelity.Core
{
    public static class DataHasher
    {
        private static readonly RandomNumberGenerator Rng = RandomNumberGenerator.Create();

        public static string HashData(string data)
        {
            byte[] passwordBytes = Encoding.UTF8.GetBytes( data );
            byte[] salt = new byte[16];
            Rng.GetBytes(salt);

            Argon2Config config = new Argon2Config
            {
                Type = Argon2Type.DataIndependentAddressing,
                Version = Argon2Version.Nineteen,
                TimeCost = 10,
                MemoryCost = 32768,
                Lanes = 5,
                Threads = Environment.ProcessorCount,
                Password = passwordBytes,
                Salt = salt,
                // Temporary.
                // TODO: Store secret in .env
                Secret = Encoding.UTF8.GetBytes( "Ph+j=N!6Q%a9BX" ),
                // AssociatedData = associatedData,
                HashLength = 20 // >= 4
            };

            Argon2 argon2 = new Argon2( config );

            string hashString;
            using (SecureArray<byte> hash = argon2.Hash())
            {
                hashString = config.EncodeString( hash.Buffer );
            }

            return hashString;
        }

        public static bool Compare(string dataToVerify, string hashedData)
        {
            var configOfPasswordToVerify = new Argon2Config { Password = Encoding.UTF8.GetBytes( dataToVerify ), Threads = 1 };
            SecureArray<byte> hash = null;
            try
            {
                if (configOfPasswordToVerify.DecodeString(hashedData, out hash) && hash != null)
                {
                    Argon2 argon2ToVerify = new Argon2( configOfPasswordToVerify );
                    using (var hashToVerify = argon2ToVerify.Hash())
                    {
                        if (!hash.Buffer.Where((b, i) => b != hashToVerify[i]).Any())
                        {
                            return true;
                        }

                        return false;
                    }
                }

                return false;
            }
            finally
            {
                hash?.Dispose();
            }
        }
    }
}
