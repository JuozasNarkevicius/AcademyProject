namespace WebAPI.DTO_s
{
    public class WorkoutProgramDTO
    {
        public string Name { get; set; }
        public List<WorkoutDayDTO> Workouts { get; set; }
    }
}
