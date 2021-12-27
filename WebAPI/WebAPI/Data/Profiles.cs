using AutoMapper;
using WebAPI.Data.DTO_s;
using WebAPI.Data.Entities;

namespace WebAPI.Data
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

            CreateMap<User, UserDTO>();
            CreateMap<UserDTO, User>()
                .ForMember(dest => dest.Id,
                opt => opt.Ignore());

            CreateMap<WorkoutProgram, WorkoutProgramDTO>();
            //CreateMap<WorkoutProgramDTO, WorkoutProgram>()
            //    .ForMember(dest => dest.Id,
            //    opt => opt.Ignore());

            CreateMap<CreateWorkoutDayDTO, WorkoutDay>();
            CreateMap<CreateWorkoutProgramDTO, WorkoutProgram>();
        }
    }
}
