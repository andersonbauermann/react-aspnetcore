using activityList_API.Data;
using activityList_API.Models;
using Microsoft.AspNetCore.Mvc;

namespace activityList_API.Controllers;

[ApiController]
[Route("controller")]
public class ActivityController : ControllerBase
{
    private readonly DataContext _context;

    public ActivityController(DataContext context) => _context = context;

    [HttpGet]
    public IEnumerable<Activity> Get()
    {
        return _context.Activities;
    } 
       
    [HttpGet("{id}")]
    public Activity Get(int id)
    {
        return _context.Activities.FirstOrDefault(activity => activity.Id == id);
    } 
    
    [HttpPost]
    public IEnumerable<Activity> Post(Activity activity)
    {
        _context.Activities.Add(activity);

        if (_context.SaveChanges() > 0)
            return _context.Activities;

        throw new InvalidOperationException("Erro: Não foi possível adicionar a atividade!");
    }
    
    [HttpPut]
    public Activity Put(int id, Activity activity)
    {
        if (activity.Id != id) throw new InvalidOperationException("Erro!");

        _context.Update(activity);

        if (_context.SaveChanges() > 0)
            return _context.Activities.First(activity => activity.Id == id);

        return new Activity();
    }
    
    [HttpDelete("{id}")]
    public bool Delete(int id)
    {
        var activity = _context.Activities.FirstOrDefault(activity => activity.Id == id);

        if (activity is null) throw new InvalidOperationException("Eroo: Você está tentando excluir uma atividade inesistente!");

        _context.Remove(activity);

        return _context.SaveChanges() > 0;
    }
}
