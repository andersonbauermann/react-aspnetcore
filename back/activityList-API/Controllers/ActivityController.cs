using ActivityList.Domain.Entities;
using ActivityList.Domain.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace activityList_API.Controllers;

[ApiController]
[Route("[controller]")]
public class ActivityController(IActivityService activityService) : ControllerBase
{
    private readonly IActivityService _activityService = activityService;

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        try
        {
            var activities = await _activityService.GetAllActivitiesAsync();

            if (activities is null) return NoContent();

            return Ok(activities);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                $"Erro ao tentar buscar as atividades. Erro: {ex.Message}");
        }
    } 
       
    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
        try
        {
            var activity = await _activityService.GetActivityByIdAsync(id);

            if (activity is null) return NoContent();

            return Ok(activity);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                $"Erro ao tentar buscar a atividade com id: {id}. Erro: {ex.Message}");
        }
    } 
    
    [HttpPost]
    public async Task<IActionResult> Post(Activity request)
    {
        try
        {
            var activity = await _activityService.AddActivity(request);

            if (activity is null) return NoContent();

            return Ok(activity);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                $"Erro ao tentar criar a atividade {request.Title}. Erro: {ex.Message}");
        }
    }
    
    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, Activity request)
    {
        try
        {
            if (request.Id != id)
            {
                return StatusCode(StatusCodes.Status409Conflict,
                         $"Você está tentando alterar uma atividade errada!");
            }

            var activity = await _activityService.UpdateActivity(request);

            if (activity is null) return NoContent();

            return Ok(activity);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                $"Erro ao tentar atualizar a atividade {request.Title}. Erro: {ex.Message}");
        }
    }
    
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            var activity = await _activityService.GetActivityByIdAsync(id);

            if (activity is null)
            {
                return StatusCode(StatusCodes.Status409Conflict,
                        $"Você está tentando deletar uma atividade que não existe!");
            }

            bool deletedActivity = await _activityService.DeleteActivity(id);

            if (deletedActivity)
            {
                return Ok(new { message = "Deletado" });
            }

            return BadRequest("Ocorreu um problema inesperado ao tentar deletar a atividade.");
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                $"Erro ao tentar deletar a atividade com id: {id}. Erro: {ex.Message}");
        }
    }
}
