namespace ActivityList.Domain.Entities;

public class Activity
{
    public Activity() => CreationDate = DateTime.Now;

    public Activity(int id, string title, string description) : this()
    {
        Id = id;
        Title = title;
        Description = description;
    }

    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public DateTime CreationDate { get; set; }
    public DateTime? ConclusionDate { get; set; }
    public Priority Priority { get; set; }

    public void Conclude()
    {
        if (ConclusionDate is null)
            ConclusionDate = DateTime.Now;
        else
            throw new InvalidOperationException($"Atividade já concluída em: {ConclusionDate:dd/MM/yyyy hh:mm}");
    }
}
