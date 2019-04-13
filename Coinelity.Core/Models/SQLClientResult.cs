using System;
using System.Windows;
using System.Collections.Generic;
using System.Text;
using System.Data.SqlClient;

namespace Coinelity.Core.Models
{
    public class SQLClientResult : Freezable
    {
        #region CONSTRUCTORS

        /// <summary>
        /// 
        /// Creates a new successful sql result.
        /// 
        /// </summary>
        /// <param name="queryResult"> Defaults to an empty List[Dictionary[string, object]] if left null. </param>
        /// <param name="affectedRows"> Defaults to the queryResult List count if left null. </param>
        public SQLClientResult(IList<Dictionary<string, object>> queryResult = null, int? affectedRows = null)
        {
            this._queryResult = queryResult == null ? new List<Dictionary<string, object>>() : queryResult;
            this._affectedRows = affectedRows;
            this.Success = true;
        }

        /// <summary>
        /// 
        /// Creates a new unsuccessful sql result.
        /// 
        /// </summary>
        /// <param name="errorMessages"></param>
        public SQLClientResult(SqlException sqlException)
        {
            for (int i = 0; i < sqlException.Errors.Count; ++i )
            {
                this._errorMessages.Add( sqlException.Errors[i].Message );
            }

            this.Exceptions = new List<object>() { sqlException };
            this.Success = false;
        }

        public SQLClientResult(Exception e)
        {
            this._errorMessages = new List<string>() { e.Message };
            this.Exceptions = new List<object>() { e };
            this.Success = false;
        }

        public SQLClientResult(List<string> errors)
        {
            this._errorMessages = errors;
            this.Success = false;
        }

        #endregion

        #region PROPERTIES

        private bool _success;

        /// <summary>
        /// 
        /// "true" if successfull or "false" in case an Exception gets thrown.
        /// 
        /// </summary>
        public bool Success
        {
            get
            {
                return _success;
            }

            private set
            {
                if (this.IsFrozen)
                    throw ThrowFreezedException();

                _success = value;
            }
        }

        private int? _affectedRows = null;

        public int AffectedRows
        {
            get
            {
                if (_affectedRows == null)
                    return QueryResult.Count;

                return (int)_affectedRows;
            }

            private set
            {
                if (this.IsFrozen)
                    throw ThrowFreezedException();

                _affectedRows = value;
            }
        }

        private IList<Dictionary<string, object>> _queryResult;

        public IList<Dictionary<string, object>> QueryResult
        {
            get
            {
                return _queryResult;
            }

            private set
            {
                if (this.IsFrozen)
                    throw ThrowFreezedException();

                _queryResult = value;
            }
        }

        private List<string> _errorMessages;

        /// <summary>
        /// A List with all the Exception messages or an empty one.
        /// </summary>
        public List<string> ErrorMessages
        {
            get
            {
                return _errorMessages;
            }

            private set
            {
                if (this.IsFrozen)
                    throw ThrowFreezedException();

                this._errorMessages = value;
            }
        }

        private List<object> _exceptions;

        public List<object> Exceptions
        {
            get
            {
                return _exceptions;
            }

            private set
            {
                if (this.IsFrozen)
                    throw ThrowFreezedException();

                this._exceptions = value;
            }
        }

        #endregion

        #region METHODS

        public void AddErrorMessage( string errorMessage )
        {
            if (this.IsFrozen)
                throw ThrowFreezedException();

            this.ErrorMessages.Add( errorMessage );
        }

        /// <summary>
        /// It appends an error message List to the existing ErrorMessages List.
        /// </summary>
        /// <param name="errorMessages"></param>
        public void AddErrorMessages(List<string> errorMessages)
        {
            if (this.IsFrozen)
                throw ThrowFreezedException();

            this.ErrorMessages.AddRange( errorMessages );
        }

        /// <summary>
        /// It adds a new exception, as well as its message.
        /// </summary>
        /// <param name="exceptions"></param>
        public void AddException( Exception exception )
        {
            if (this.IsFrozen)
                throw ThrowFreezedException();

            this.ErrorMessages.Add( exception.Message );
            this.Exceptions.Add( exception );
        }

        /// <summary>
        /// It appends an error message List to the existing ErrorMessages List, as well as to the ErrorMessages List.
        /// </summary>
        /// <param name="exceptions"></param>
        public void AddExceptions(List<Exception> exceptions)
        {
            if (this.IsFrozen)
                throw ThrowFreezedException();

            for (int i = 0; i < exceptions.Count; ++i)
                this.ErrorMessages.Add( exceptions[i].Message );

            this.Exceptions.AddRange( exceptions );
        }

        #endregion
    }
}
