namespace WebAPI.DTO_s
{
    public class WorkoutProgramDTO
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public double Rating { get; set; }
        public bool IsPublic { get; set; }
        public List<WorkoutDayDTO> Workouts { get; set; }
    }
}
