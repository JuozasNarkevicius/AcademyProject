﻿using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    public class ProgramRating
    {
        public long Id { get; set; }
        public double StarCount { get; set; }

        [ForeignKey("WorkoutProgram")]
        public long ProgramId { get; set; }
        public WorkoutProgram WorkoutProgram { get; set; }

        [ForeignKey("User")]
        public long UserId { get; set; }
        public User User { get; set; }
    }
}
