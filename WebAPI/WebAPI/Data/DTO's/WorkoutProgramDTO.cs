namespace WebAPI.Data.DTO_s
{
    public class WorkoutProgramDTO
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public List<WorkoutDayDTO> Workouts { get; set; }
    }
}
