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
using System.Security.Cryptography;
using System.Text;
using Isopoh.Cryptography.Argon2;
using Isopoh.Cryptography.SecureArray;

namespace Coinelity.Core
{
    public static class DataHasher
    {
        private static readonly RandomNumberGenerator Rng = RandomNumberGenerator.Create();

        // TODO: Less time hash time.
        // Currently taking 3s/4s.
        private static readonly Argon2Config _config = new Argon2Config
        {
            Type = Argon2Type.DataIndependentAddressing,
            Version = Argon2Version.Nineteen,
            TimeCost = 9,
            MemoryCost = 22768,
            Lanes = 5,
            Threads = 2,
            // Temporary.
            // TODO: Store secret in .env
            Secret = Encoding.UTF8.GetBytes("Ph+j=N!6Q%a9BX"),
            // AssociatedData = associatedData,
            HashLength = 20
        };

        public static string HashData(string data)
        {
            byte[] passwordBytes = Encoding.UTF8.GetBytes( data );
            byte[] salt = new byte[16];
            Rng.GetBytes( salt );

            Argon2Config config = _config;
            config.Salt = salt;
            config.Password = passwordBytes;

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
            Argon2Config configOfPasswordToVerify = _config;
            configOfPasswordToVerify.Password = Encoding.UTF8.GetBytes( dataToVerify );

            SecureArray<byte> hash = null;
            try
            {
                if (configOfPasswordToVerify.DecodeString(hashedData, out hash) && hash != null)
                {
                    var argon2ToVerify = new Argon2( configOfPasswordToVerify );
                    using (var hashToVerify = argon2ToVerify.Hash())
                    {
                        return !hash.Buffer.Where((b, i) => b != hashToVerify[i]).Any();
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
