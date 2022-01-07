namespace Domain.Entities
{
    public class WorkoutDay
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public List<Exercise> Exercises { get; set; }
        public long ProgramId { get; set; }
    }
}
