namespace activityList_API.Models;

public class Activity
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public Priority Priority { get; set; }
}
