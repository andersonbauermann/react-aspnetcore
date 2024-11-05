using ActivityList.Data.Mappings;
using ActivityList.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ActivityList.Data.Context;

public class DataContext(DbContextOptions<DataContext> options) : DbContext(options)
{
    public DbSet<Activity> Activities { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new ActivityMap());
    }
}
