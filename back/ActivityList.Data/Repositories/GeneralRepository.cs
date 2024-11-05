using ActivityList.Data.Context;
using ActivityList.Domain.Interfaces.Repositories;

namespace ActivityList.Data.Repositories;

public class GeneralRepository(DataContext context) : IGeneralRepository
{
    private readonly DataContext _context = context;

    public void Create<T>(T entity) where T : class
    {
        _context.Add(entity);
    }

    public void Update<T>(T entity) where T : class
    {
        _context.Update(entity);
    }

    public void Delete<T>(T entity) where T : class
    {
        _context.Remove(entity);
    }

    public void DeleteSeveral<T>(T[] entities) where T : class
    {
        _context.RemoveRange(entities);
    }

    public async Task<bool> SaveChangesAsync()
    {
        return await _context.SaveChangesAsync() > 0;
    }
}