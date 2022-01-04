using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Data.Entities
{
    public class Exercise
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public int Sets { get; set; }
        public string Reps { get; set; }
        public int Rest { get; set; }
        public long WorkoutId { get; set; }
    }
}
