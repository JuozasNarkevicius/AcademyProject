using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Models
{
    public class WorkoutDay
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public List<Exercise> Exercises { get; set; }
        [ForeignKey("WorkoutProgram")]
        public long ProgramId { get; set; }
        public WorkoutProgram Program { get; set; }
    }
}
