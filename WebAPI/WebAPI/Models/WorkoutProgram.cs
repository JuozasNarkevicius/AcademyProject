using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Models
{
    public class WorkoutProgram
    {
        public long Id { get; set; }
        public long UserId { get; set; }
        public string Name { get; set; }
        public List<WorkoutDay> Workouts { get;set; }
    }
}
