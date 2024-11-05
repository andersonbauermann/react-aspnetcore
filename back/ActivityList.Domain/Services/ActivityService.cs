using ActivityList.Domain.Entities;
using ActivityList.Domain.Interfaces.Repositories;
using ActivityList.Domain.Interfaces.Services;

namespace ActivityList.Domain.Services;

public class ActivityService(IActivityRepository activityRepository) : IActivityService
{
    private readonly IActivityRepository _activityRepository = activityRepository;

    public async Task<Activity> AddActivity(Activity model)
    {
        if (await _activityRepository.GetByTitleAsync(model.Title) is not null)
        {
            throw new InvalidOperationException("Já existe uma atividade com esse título!");
        }

        if (await _activityRepository.GetByIdAsync(model.Id) is null)
        {
            _activityRepository.Create(model);

            if (await _activityRepository.SaveChangesAsync())
                return model;
        }

        return null;
    }

    public async Task<Activity> UpdateActivity(Activity model)
    {
        if (model.ConclusionDate != null)
        {
            throw new InvalidOperationException("Não pode ser alterada uma atividade já concluída!");
        }

        if (await _activityRepository.GetByIdAsync(model.Id) is not null)
        {
            _activityRepository.Update(model);

            if (await _activityRepository.SaveChangesAsync())
                return model;
        }

        return null;
    }

    public async Task<bool> DeleteActivity(int id)
    {
        var activity = await _activityRepository.GetByIdAsync(id) ?? throw new InvalidOperationException("A atividade não existe!");

        _activityRepository.Delete(activity);

        return await _activityRepository.SaveChangesAsync();
    }

    public async Task<bool> ConcludeActivity(Activity model)
    {
        if (model is not null)
        {
            model.Conclude();
            _activityRepository.Update(model);

            return await _activityRepository.SaveChangesAsync();
        }

        return false;
    }

    public async Task<Activity> GetActivityByIdAsync(int id)
    {
        try
        {
            var activity = await _activityRepository.GetByIdAsync(id);

            if (activity is not null) return activity;

            return null;
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public async Task<IEnumerable<Activity>> GetAllActivitiesAsync()
    {
        try
        {
            var activities = await _activityRepository.GetAllAsync();

            if (activities is not null) return activities;

            return [];
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }
}