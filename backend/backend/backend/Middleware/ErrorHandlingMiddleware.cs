using backend.Exceptions;

namespace backend.Middleware
{
    public class ErrorHandlingMiddleware : IMiddleware
    {
        public ErrorHandlingMiddleware()
        {

        }
        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                await next.Invoke(context);
            }
            catch (BadRequestException badRequestException)
            {
                context.Response.StatusCode = 400;
                await context.Response.WriteAsync(badRequestException.Message);
            }
            catch (ForbiddenAccessException noAccess)
            {
                context.Response.StatusCode = 403;
                await context.Response.WriteAsync(noAccess.Message);
            }
            catch (NotFoundException notFound)
            {
                context.Response.StatusCode = 404;
                await context.Response.WriteAsync(notFound.Message);
            }
            catch (NotAllowedExeption notAllowed)
            {
                context.Response.StatusCode = 405;
                await context.Response.WriteAsync(notAllowed.Message);
            }
        }
    }
}
