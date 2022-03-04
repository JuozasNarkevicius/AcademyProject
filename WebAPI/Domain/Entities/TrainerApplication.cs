using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    public class TrainerApplication
    {
        public long Id { get; set; }
        public string Description { get; set; }
        public string Qualifications { get; set; }
        public string ProfileImage { get; set; }

        [ForeignKey("User")]
        public long UserId { get; set; }
        public User User { get; set; }
    }
}
