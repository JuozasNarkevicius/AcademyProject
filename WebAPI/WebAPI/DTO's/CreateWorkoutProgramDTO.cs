namespace WebAPI.DTO_s
{
    public class CreateWorkoutProgramDTO
    {
        public string Name { get; set; }

        public List<CreateWorkoutDayDTO> Workouts { get; set; }
    }
}
