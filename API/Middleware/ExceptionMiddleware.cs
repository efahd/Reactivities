using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using Application.Core;

namespace API.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;
        private readonly IHostEnvironment _env;
        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment env)
        {
            _env = env;
            _logger = logger;
            _next = next;
            
        }

        public async Task InvokeAsync(HttpContext context) {
            try
            {
                //when a request comes in, it will pass straight through this exception handling. Any error exception will be caught here.
                await _next(context);
            }
            catch (Exception ex)
            {
                // Log the error inside terminal
                _logger.LogError(ex, ex.Message);

                // Returning as application/json
                // get the status code e.g 404, 500 etc
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int) HttpStatusCode.InternalServerError;

                // response check to see if we're using development mode
                // Use ternary. if using dev mode, then send the full stacktrace with statusCode
                // the " ?.Tostring() " is the optional chain, because exception need to send as String.
                // else, then send "Server Error" message with statusCode
                var response = _env.IsDevelopment()
                    ? new AppException(context.Response.StatusCode, ex.Message, ex.StackTrace?.ToString())
                    : new AppException(context.Response.StatusCode, "Server Error");

                // Return the error exception as JsonSerializer
                // Ensure the json response is in CamelCase.
                var options = new JsonSerializerOptions {PropertyNamingPolicy = JsonNamingPolicy.CamelCase};
                
                var json = JsonSerializer.Serialize(response, options);

                await context.Response.WriteAsync(json);
            }
        }
    }
}