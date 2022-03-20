using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    public class TrainerApplication
    {
        public long Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Description { get; set; }
        public string Qualifications { get; set; }
        public string ProfileImage { get; set; }
        public string Status { get; set; }

        [ForeignKey("User")]
        public long UserId { get; set; }
        public User User { get; set; }
    }
}
