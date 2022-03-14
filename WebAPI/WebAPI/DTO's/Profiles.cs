using AutoMapper;
using Domain.Entities;

namespace WebAPI.DTO_s
{
    public class Profiles : Profile
    {
        public Profiles()
        {
            CreateMap<Exercise, ExerciseDTO>();
            CreateMap<ExerciseDTO, Exercise>()
                .ForMember(dest => dest.WorkoutId,
                opt => opt.Ignore());

            CreateMap<Exercise, UpdateExerciseDTO>();
            CreateMap<UpdateExerciseDTO, Exercise>()
                .ForMember(dest => dest.Id,
                opt => opt.Ignore())
                .ForMember(dest => dest.WorkoutId,
                opt => opt.Ignore());

            CreateMap<WorkoutProgram, UpdateProgramNameDTO>();
            CreateMap<UpdateProgramNameDTO, WorkoutProgram>()
                .ForMember(dest => dest.Id,
                opt => opt.Ignore())
                .ForMember(dest => dest.Workouts,
                opt => opt.Ignore());

            CreateMap<WorkoutDay, UpdateWorkoutNameDTO>();
            CreateMap<UpdateWorkoutNameDTO, WorkoutDay>()
                .ForMember(dest => dest.Id,
                opt => opt.Ignore())
                .ForMember(dest => dest.Exercises,
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
            CreateMap<WorkoutProgram, WorkoutProgramNamesDTO>();


            //CreateMap<WorkoutDay, CreateWorkoutDayDTO>()
            //    .ForMember(dest => dest.Exercises, opt => 
            //    opt.Ignore());
            CreateMap<CreateWorkoutDayDTO, WorkoutDay>()
                .ForMember(dest => dest.Exercises,
                opt => opt.Ignore());
            CreateMap<CreateWorkoutProgramDTO, WorkoutProgram>()
                .ForMember(dest => dest.Workouts,
                opt => opt.Ignore());

            CreateMap<TrainerApplication, TrainerApplicationDTO>();
            CreateMap<TrainerApplicationDTO, TrainerApplication>()
                .ForMember(dest => dest.Id,
                opt => opt.Ignore());

            CreateMap<TrainerApplication, CreateTrainerApplicationDTO>();
            CreateMap<CreateTrainerApplicationDTO, TrainerApplication>()
                .ForMember(dest => dest.Id,
                opt => opt.Ignore());

            CreateMap<ProgramRating, UpdateRatingDTO>();
            CreateMap<UpdateRatingDTO, ProgramRating>()
                .ForMember(dest => dest.Id,
                opt => opt.Ignore())
                .ForMember(dest => dest.UserId,
                opt => opt.Ignore())
                .ForMember(dest => dest.ProgramId,
                opt => opt.Ignore());

            CreateMap<ProgramRating, CreateRatingDTO>();
            CreateMap<CreateRatingDTO, ProgramRating>()
                .ForMember(dest => dest.Id,
                opt => opt.Ignore());
        }
    }
}
