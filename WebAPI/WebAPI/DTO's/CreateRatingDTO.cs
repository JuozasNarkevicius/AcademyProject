namespace WebAPI.DTO_s
{
    public class CreateRatingDTO
    {
        public double StarCount { get; set; }
        public long? ProgramId { get; set; }
        public long? TrainerId { get; set; }
        public long UserId { get; set; }
    }
}
