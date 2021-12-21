using AutoMapper;
using WebAPI.DTO_s;
using WebAPI.Models;

namespace WebAPI.Profiles
{
    public class Profiles : Profile
    {
        public Profiles()
        {
            CreateMap<Exercise, ExerciseDTO>();
            CreateMap<ExerciseDTO, Exercise>()
                .ForMember(dest => dest.Id,
                opt => opt.Ignore())
                .ForMember(dest => dest.WorkoutId,
                opt => opt.Ignore());

            CreateMap<WorkoutDay, WorkoutDayDTO>();
            CreateMap<WorkoutDayDTO, WorkoutDay>()
                .ForMember(dest => dest.Id,
                opt => opt.Ignore())
                .ForMember(dest => dest.ProgramId,
                opt => opt.Ignore());

            CreateMap<WorkoutProgram, WorkoutProgramDTO>();

            CreateMap<CreateWorkoutDayDTO, WorkoutDay>();
        }
    }
}
