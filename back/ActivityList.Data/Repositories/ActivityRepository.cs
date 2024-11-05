using ActivityList.Data.Context;
using ActivityList.Domain.Entities;
using ActivityList.Domain.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;

namespace ActivityList.Data.Repositories
{
    public class ActivityRepository(DataContext context) : GeneralRepository(context), IActivityRepository
    {
        private readonly DataContext _context = context;

        public async Task<IEnumerable<Activity>> GetAllAsync()
        {
            IQueryable<Activity> query = _context.Activities;

            query = query.AsNoTracking()
                         .OrderBy(activ => activ.Id);

            return await query.ToArrayAsync();
        }

        public async Task<Activity> GetByIdAsync(int id)
        {
            IQueryable<Activity> query = _context.Activities;

            query = query.AsNoTracking()
                         .OrderBy(activ => activ.Id)
                         .Where(activ => activ.Id == id);

            return await query.FirstOrDefaultAsync();
        }

        public async Task<Activity> GetByTitleAsync(string title)
        {
            IQueryable<Activity> query = _context.Activities;

            query = query.AsNoTracking()
                         .OrderBy(activ => activ.Id);

            return await query.FirstOrDefaultAsync(activ => activ.Title.Equals(title));
        }
    }
}
