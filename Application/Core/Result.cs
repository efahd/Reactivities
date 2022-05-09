using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Core
{
    //Create a generic type <T>
    public class Result<T>
    {
        public Boolean isSuccess { get; set; }
        public T Value { get; set; }
        public string Error { get; set; }
        
        //return new Result<t> with properties {value}
        // if I get non-existence activity, then activity value will be {activity value} or Null
        // will return NotFound() if Null else activity value
        public static Result<T> Success(T value) => new Result<T> {isSuccess = true, Value = value};
        public static Result<T> Failure(string error) => new Result<T> {isSuccess = false, Error = error};
    }
}