using ActivityList.Domain.Entities;

namespace ActivityList.Domain.Interfaces.Services;

public interface IActivityService
{
    Task<Activity> AddActivity(Activity model);
    Task<Activity> UpdateActivity(Activity model);
    Task<bool> DeleteActivity(int id);
    Task<bool> ConcludeActivity(Activity model);
    Task<IEnumerable<Activity>> GetAllActivitiesAsync();
    Task<Activity> GetActivityByIdAsync(int id);
}