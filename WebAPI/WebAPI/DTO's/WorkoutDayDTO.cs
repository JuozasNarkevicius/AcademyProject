namespace WebAPI.DTO_s
{
    public class WorkoutDayDTO
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public int Position { get; set; }
        public List<ExerciseDTO> Exercises { get; set; }
    }
}
