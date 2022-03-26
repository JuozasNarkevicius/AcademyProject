using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    public class WorkoutDay
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public int Position { get; set; }

        public List<Exercise> Exercises { get; set; }

        [ForeignKey("WorkoutProgram")]
        public long ProgramId { get; set; }
        public WorkoutProgram WorkoutProgram { get; set; }
    }
}
