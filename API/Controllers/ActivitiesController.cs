using Domain;
using Microsoft.AspNetCore.Mvc;
using Application.Activities;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetActivities()
        {
            //get response back from our mediator handler
            return HandleResult(await Mediator.Send(new List.Query()));
        }
        
        [HttpGet("{id}")] // activities/id

        //type IActionResult will allows to return HTTP Responses
        public async Task<IActionResult> GetActivity(Guid id)
        {
            //Validate Mediator result in class HandleResult(result) in BaseApiController
            //if Mediator result Not exist, Mediator will send Null

            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
            
        }
        
        //When we create resources in API, we use HttpPost
        //Use IActionResult, it give us access to http response type such as Return OK, NOT FOUND
        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            return HandleResult(await Mediator.Send(new Create.Command{Activity = activity}));
        }
        
        //HttpPut used for updating resources
        [HttpPut("{id}")]

        public async Task<IActionResult> EditActivity(Guid id, Activity activity)
        {
            activity.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{Activity = activity}));
        }

        //HttpDelete used for deleting resources
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}