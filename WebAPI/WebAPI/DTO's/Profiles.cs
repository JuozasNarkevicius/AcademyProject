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

            CreateMap<Exercise, CreateExerciseDTO>();
            CreateMap<CreateExerciseDTO, Exercise>()
                .ForMember(dest => dest.WorkoutId,
                opt => opt.Ignore())
                .ForMember(dest => dest.Id,
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

            CreateMap<User, CreateUserDTO>();
            CreateMap<CreateUserDTO, User>()
                .ForMember(dest => dest.Id,
                opt => opt.Ignore());

            CreateMap<User, UpdateUserDTO>();
            CreateMap<UpdateUserDTO, User>()
                .ForMember(dest => dest.Id,
                opt => opt.Ignore());

            CreateMap<WorkoutProgram, WorkoutProgramDTO>();
            CreateMap<WorkoutProgram, WorkoutProgramNamesDTO>();

            CreateMap<CreateWorkoutDayDTO, WorkoutDay>()
                .ForMember(dest => dest.Exercises,
                opt => opt.Ignore());
            CreateMap<CreateWorkoutProgramDTO, WorkoutProgram>()
                .ForMember(dest => dest.Workouts,
                opt => opt.Ignore());

            CreateMap<TrainerApplication, TrainerApplicationDTO>();
            CreateMap<TrainerApplicationDTO, TrainerApplication>();

            CreateMap<TrainerApplication, CreateTrainerApplicationDTO>();
            CreateMap<CreateTrainerApplicationDTO, TrainerApplication>()
                .ForMember(dest => dest.Id,
                opt => opt.Ignore());

            CreateMap<Rating, UpdateRatingDTO>();
            CreateMap<UpdateRatingDTO, Rating>()
                .ForMember(dest => dest.Id,
                opt => opt.Ignore())
                .ForMember(dest => dest.UserId,
                opt => opt.Ignore())
                .ForMember(dest => dest.ProgramId,
                opt => opt.Ignore());

            CreateMap<Rating, CreateRatingDTO>();
            CreateMap<CreateRatingDTO, Rating>()
                .ForMember(dest => dest.Id,
                opt => opt.Ignore());

            CreateMap<SavedProgram, CreateSavedProgramDTO>();
            CreateMap<CreateSavedProgramDTO, SavedProgram>()
                .ForMember(dest => dest.Id,
                opt => opt.Ignore())
                .ForMember(dest => dest.UserId,
                opt => opt.Ignore());

            CreateMap<TrainerApplication, UpdateTrainerApplicationDTO>();
            CreateMap<UpdateTrainerApplicationDTO, TrainerApplication>()
                .ForMember(dest => dest.Id,
                opt => opt.Ignore())
                .ForMember(dest => dest.UserId,
                opt => opt.Ignore())
                .ForMember(dest => dest.FirstName,
                opt => opt.Ignore())
                .ForMember(dest => dest.LastName,
                opt => opt.Ignore())
                .ForMember(dest => dest.Email,
                opt => opt.Ignore());
        }
    }
}
