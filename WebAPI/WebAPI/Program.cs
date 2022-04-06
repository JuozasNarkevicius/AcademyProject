using Application.DatabaseContext;
using Application.Jwt;
using Application.Repositories;
using DinkToPdf;
using DinkToPdf.Contracts;
using EmailService;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.EntityFrameworkCore;
using WebAPI.Services;

var builder = WebApplication.CreateBuilder(args);
var emailConfig = builder.Configuration
    .GetSection("EmailConfiguration")
    .Get<EmailConfiguration>();

builder.Services.AddSingleton(emailConfig);
builder.Services.Configure<FormOptions>(o =>
{
    o.ValueLengthLimit = int.MaxValue;
    o.MultipartBodyLengthLimit = int.MaxValue;
    o.MemoryBufferThreshold = int.MaxValue;
});
builder.Services.AddSingleton(typeof(IConverter), new SynchronizedConverter(new PdfTools()));
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddCors(p => p.AddPolicy("corsapp", builder =>
{
    builder
    .AllowAnyMethod()
    .AllowAnyHeader()
    .AllowCredentials()
    .SetIsOriginAllowed(host => true);
}));

builder.Services.AddMvc(options =>
{
    options.SuppressAsyncSuffixInActionNames = false;
});

builder.Services.AddDbContext<WebContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("WebContext")));

builder.Services.Configure<JwtConfig>(builder.Configuration.GetSection("AppSettings"));

builder.Services.AddScoped<IPdfCreator, PdfCreator>();
builder.Services.AddScoped<IEmailSender, EmailSender>();
builder.Services.AddScoped<IExerciseRepository, ExerciseRepository>();
builder.Services.AddScoped<IWorkoutDayRepository, WorkoutDayRepository>();
builder.Services.AddScoped<IWorkoutProgramRepository, WorkoutProgramRepository>();
builder.Services.AddScoped<IAuthorizationService, AuthorizationService>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<ITrainerApplicationRepository, TrainerApplicationRepository>();
builder.Services.AddScoped<IRatingRepository, RatingRepository>();

builder.Services.AddAuthentication(options => {
    options.DefaultScheme = "Cookies";
}).AddCookie("Cookies", options => {
    options.Cookie.Name = "accessToken";
    options.Cookie.SameSite = SameSiteMode.None;
    options.Cookie.MaxAge = TimeSpan.FromHours(5);
    options.Events = new CookieAuthenticationEvents
    {
        OnRedirectToLogin = redirectContext =>
        {
            redirectContext.HttpContext.Response.StatusCode = 401;
            return Task.CompletedTask;
        }
    };
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseCors("corsapp");

app.UseHttpsRedirection();

app.UseCookiePolicy(
    new CookiePolicyOptions
    {
        Secure = CookieSecurePolicy.Always
    });

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
