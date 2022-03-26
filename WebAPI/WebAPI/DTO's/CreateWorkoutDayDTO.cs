namespace WebAPI.DTO_s
{
    public class CreateWorkoutDayDTO
    {
        public string Name { get; set; }
        public int Position { get; set; }

        public List<ExerciseDTO> Exercises { get; set; }
    }
}
