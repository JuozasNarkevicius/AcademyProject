﻿namespace WebAPI.DTO_s
{
    public class ExerciseDTO
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public int Sets { get; set; }
        public string Reps { get; set; }
        public int Rest { get; set; }
        public int Position { get; set; }
    }
}
