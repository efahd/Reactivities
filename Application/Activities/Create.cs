using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        //Query return data; Command Do not
        public class Command : IRequest
        {
            public Activity Activity {get; set;}

        }

        public class handler : IRequestHandler<Command>
        {
        private readonly DataContext _context;
            public handler(DataContext context)
            {
            _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Activities.Add(request.Activity);

                await _context.SaveChangesAsync();

                //when use MediatR send, the app waiting for the action to finish inside ApiController. Hence, we return nothing just to let the app knows the activity done.
                return Unit.Value;
            }
        }
    }
}