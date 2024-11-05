using ActivityList.Domain.Entities;

namespace ActivityList.Domain.Interfaces.Repositories;

public interface IActivityRepository : IGeneralRepository
{
    Task<IEnumerable<Activity>> GetAllAsync();
    Task<Activity> GetByIdAsync(int id);
    Task<Activity> GetByTitleAsync(string title);
}
