namespace WebAPI.Data.DTO_s
{
    public class CreateWorkoutDayDTO
    {
        public string Name { get; set; }

        public List<ExerciseDTO> Exercises { get; set; }
    }
}
