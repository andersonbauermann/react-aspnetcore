using activityList_API.Models;
using Microsoft.EntityFrameworkCore;

namespace activityList_API.Data;

public class DataContext(DbContextOptions<DataContext> options) : DbContext(options)
{
    public DbSet<Activity> Activities { get; set; }
}
