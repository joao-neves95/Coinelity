using System;
using System.Collections.Generic;
using System.Text;
using System.Data.SqlClient;

namespace Coinelity.Core.Data
{
    public class SQLClientResult
    {
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

            this.Success = false;
        }

        public SQLClientResult(Exception e)
        {
            this._errorMessages = new List<string>();
            this._errorMessages.Add( e.Message );
            this.Success = false;
        }

        public SQLClientResult(List<string> errors)
        {
            this._errorMessages = new List<string>();
            this._errorMessages = errors;
            this.Success = false;
        }

        public bool Success { get; }

        private int? _affectedRows = null;

        public int AffectedRows
        {
            get
            {
                if (_affectedRows == null)
                    return QueryResult.Count;

                return (int)_affectedRows;
            }
        }

        private IList<Dictionary<string, object>> _queryResult;

        public IList<Dictionary<string, object>> QueryResult
        {
            get
            {
                return _queryResult;
            }
        }

        private List<string> _errorMessages = null;

        public List<string> ErrorMessages { get; }
    }
}
