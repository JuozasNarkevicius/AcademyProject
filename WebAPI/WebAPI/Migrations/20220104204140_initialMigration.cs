using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Migrations
{
    public partial class initialMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Programs",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<long>(type: "bigint", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Programs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Age = table.Column<int>(type: "int", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Workouts",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProgramId = table.Column<long>(type: "bigint", nullable: false),
                    WorkoutProgramId = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Workouts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Workouts_Programs_WorkoutProgramId",
                        column: x => x.WorkoutProgramId,
                        principalTable: "Programs",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Exercises",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Sets = table.Column<int>(type: "int", nullable: false),
                    Reps = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Rest = table.Column<int>(type: "int", nullable: false),
                    WorkoutId = table.Column<long>(type: "bigint", nullable: false),
                    WorkoutDayId = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Exercises", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Exercises_Workouts_WorkoutDayId",
                        column: x => x.WorkoutDayId,
                        principalTable: "Workouts",
                        principalColumn: "Id");
                });

            migrationBuilder.InsertData(
                table: "Exercises",
                columns: new[] { "Id", "Name", "Reps", "Rest", "Sets", "WorkoutDayId", "WorkoutId" },
                values: new object[,]
                {
                    { 1L, "Exercise nr1", "12, 12, 12, 12", 90, 4, null, 1L },
                    { 2L, "Exercise nr2", "12, 12, 12, 12", 90, 4, null, 1L },
                    { 3L, "Exercise nr3", "12, 12, 12, 12", 90, 4, null, 1L },
                    { 4L, "Exercise nr4", "12, 12, 12, 12", 90, 4, null, 1L },
                    { 5L, "Exercise nr1", "12, 12, 12, 12", 90, 4, null, 2L },
                    { 6L, "Exercise nr2", "12, 12, 12, 12", 90, 4, null, 2L },
                    { 7L, "Exercise nr3", "12, 12, 12, 12", 90, 4, null, 2L },
                    { 8L, "Exercise nr4", "12, 12, 12, 12", 90, 4, null, 2L },
                    { 9L, "Exercise nr1", "12, 12, 12, 12", 90, 4, null, 3L },
                    { 10L, "Exercise nr2", "12, 12, 12, 12", 90, 4, null, 3L },
                    { 11L, "Exercise nr3", "12, 12, 12, 12", 90, 4, null, 3L },
                    { 12L, "Exercise nr4", "12, 12, 12, 12", 90, 4, null, 3L },
                    { 13L, "Exercise nr1", "12, 12, 12, 12", 90, 4, null, 4L },
                    { 14L, "Exercise nr2", "12, 12, 12, 12", 90, 4, null, 4L },
                    { 15L, "Exercise nr3", "12, 12, 12, 12", 90, 4, null, 4L },
                    { 16L, "Exercise nr4", "12, 12, 12, 12", 90, 4, null, 4L }
                });

            migrationBuilder.InsertData(
                table: "Programs",
                columns: new[] { "Id", "Name", "UserId" },
                values: new object[] { 1L, "Program nr1", 1L });

            migrationBuilder.InsertData(
                table: "Workouts",
                columns: new[] { "Id", "Name", "ProgramId", "WorkoutProgramId" },
                values: new object[,]
                {
                    { 1L, "Workout nr1", 1L, null },
                    { 2L, "Workout nr2", 1L, null },
                    { 3L, "Workout nr3", 1L, null },
                    { 4L, "Workout nr4", 1L, null }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Exercises_WorkoutDayId",
                table: "Exercises",
                column: "WorkoutDayId");

            migrationBuilder.CreateIndex(
                name: "IX_Workouts_WorkoutProgramId",
                table: "Workouts",
                column: "WorkoutProgramId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Exercises");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Workouts");

            migrationBuilder.DropTable(
                name: "Programs");
        }
    }
}
