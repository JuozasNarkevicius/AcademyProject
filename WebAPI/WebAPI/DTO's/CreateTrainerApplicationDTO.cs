namespace WebAPI.DTO_s
{
    public class CreateTrainerApplicationDTO
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Description { get; set; }
        public string Qualifications { get; set; }
        public string Specializations { get; set; }
        public string WorkExperience { get; set; }
        public string ImageId { get; set; }
        public long UserId { get; set; }
    }
}
