using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        //Query return data; Command Do not
        //But in this case, we return data by Result<Unit> which is void or return Nothing.
        public class Command : IRequest<Result<Unit>>
        {
            public Activity Activity {get; set;}

        }

        //Validate the Command Class since it contain our Activity
        public class CommandValidator : AbstractValidator<Command>
        {
            //Generate Constructor CommandValidator
            public CommandValidator()
            {
                RuleFor(x => x.Activity).SetValidator(new ActivityValidator());
            }
        }

        public class handler : IRequestHandler<Command, Result<Unit>>
        {
        private readonly DataContext _context;
            public handler(DataContext context)
            {
            _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Activities.Add(request.Activity);

                //saveChangesAsync return Integer value. 
                //if nothing been written to the Database, which value is 0, then results return false
                //else, value will be more than 0, hence result return true
                var result = await _context.SaveChangesAsync() > 0;
                if (!result) return Result<Unit>.Failure("Failed to Create Activity");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}