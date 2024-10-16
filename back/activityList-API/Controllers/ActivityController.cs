using activityList_API.Models;
using Microsoft.AspNetCore.Mvc;

namespace activityList_API.Controllers;

[ApiController]
[Route("controller")]
public class ActivityController : ControllerBase
{
    [HttpGet]
    public Activity Get()
    {
        return new Activity();
    } 
       
    [HttpGet("{id}")]
    public string Get(int id)
    {
        return "meu endpoint";
    } 
    
    [HttpPost]
    public string Post()
    {
        return "meu endpoint";
    }
    
    [HttpPut]
    public string Put()
    {
        return "meu endpoint";
    }
    
    [HttpDelete("{id}")]
    public string Delete(int id)
    {
        return "meu endpoint";
    }
}
