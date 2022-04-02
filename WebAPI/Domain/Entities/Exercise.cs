using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    public class Exercise
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public int Sets { get; set; }
        public string Reps { get; set; }
        public int Rest { get; set; }
        public string? Description { get; set; }
        public string? VideoUrl { get; set; }
        public int Position { get; set; }

        [ForeignKey("WorkoutDay")]
        public long WorkoutId { get; set; }
        public WorkoutDay WorkoutDay { get; set; }

    }
}
