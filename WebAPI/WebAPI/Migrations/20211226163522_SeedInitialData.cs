using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Migrations
{
    public partial class SeedInitialData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Programs",
                columns: new[] { "Id", "Name", "UserId" },
                values: new object[] { 1L, "Program nr1", 1L });

            migrationBuilder.InsertData(
                table: "Workouts",
                columns: new[] { "Id", "Name", "ProgramId" },
                values: new object[,]
                {
                    { 1L, "Workout nr1", 1L },
                    { 2L, "Workout nr2", 1L },
                    { 3L, "Workout nr3", 1L },
                    { 4L, "Workout nr4", 1L }
                });

            migrationBuilder.InsertData(
                table: "Exercises",
                columns: new[] { "Id", "Name", "Reps", "Rest", "Sets", "WorkoutId" },
                values: new object[,]
                {
                    { 1L, "Exercise nr1", "12, 12, 12, 12", 90, 4, 1L },
                    { 2L, "Exercise nr2", "12, 12, 12, 12", 90, 4, 1L },
                    { 3L, "Exercise nr3", "12, 12, 12, 12", 90, 4, 1L },
                    { 4L, "Exercise nr4", "12, 12, 12, 12", 90, 4, 1L },
                    { 5L, "Exercise nr1", "12, 12, 12, 12", 90, 4, 2L },
                    { 6L, "Exercise nr2", "12, 12, 12, 12", 90, 4, 2L },
                    { 7L, "Exercise nr3", "12, 12, 12, 12", 90, 4, 2L },
                    { 8L, "Exercise nr4", "12, 12, 12, 12", 90, 4, 2L },
                    { 9L, "Exercise nr1", "12, 12, 12, 12", 90, 4, 3L },
                    { 10L, "Exercise nr2", "12, 12, 12, 12", 90, 4, 3L },
                    { 11L, "Exercise nr3", "12, 12, 12, 12", 90, 4, 3L },
                    { 12L, "Exercise nr4", "12, 12, 12, 12", 90, 4, 3L },
                    { 13L, "Exercise nr1", "12, 12, 12, 12", 90, 4, 4L },
                    { 14L, "Exercise nr2", "12, 12, 12, 12", 90, 4, 4L },
                    { 15L, "Exercise nr3", "12, 12, 12, 12", 90, 4, 4L },
                    { 16L, "Exercise nr4", "12, 12, 12, 12", 90, 4, 4L }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Exercises",
                keyColumn: "Id",
                keyValue: 1L);

            migrationBuilder.DeleteData(
                table: "Exercises",
                keyColumn: "Id",
                keyValue: 2L);

            migrationBuilder.DeleteData(
                table: "Exercises",
                keyColumn: "Id",
                keyValue: 3L);

            migrationBuilder.DeleteData(
                table: "Exercises",
                keyColumn: "Id",
                keyValue: 4L);

            migrationBuilder.DeleteData(
                table: "Exercises",
                keyColumn: "Id",
                keyValue: 5L);

            migrationBuilder.DeleteData(
                table: "Exercises",
                keyColumn: "Id",
                keyValue: 6L);

            migrationBuilder.DeleteData(
                table: "Exercises",
                keyColumn: "Id",
                keyValue: 7L);

            migrationBuilder.DeleteData(
                table: "Exercises",
                keyColumn: "Id",
                keyValue: 8L);

            migrationBuilder.DeleteData(
                table: "Exercises",
                keyColumn: "Id",
                keyValue: 9L);

            migrationBuilder.DeleteData(
                table: "Exercises",
                keyColumn: "Id",
                keyValue: 10L);

            migrationBuilder.DeleteData(
                table: "Exercises",
                keyColumn: "Id",
                keyValue: 11L);

            migrationBuilder.DeleteData(
                table: "Exercises",
                keyColumn: "Id",
                keyValue: 12L);

            migrationBuilder.DeleteData(
                table: "Exercises",
                keyColumn: "Id",
                keyValue: 13L);

            migrationBuilder.DeleteData(
                table: "Exercises",
                keyColumn: "Id",
                keyValue: 14L);

            migrationBuilder.DeleteData(
                table: "Exercises",
                keyColumn: "Id",
                keyValue: 15L);

            migrationBuilder.DeleteData(
                table: "Exercises",
                keyColumn: "Id",
                keyValue: 16L);

            migrationBuilder.DeleteData(
                table: "Workouts",
                keyColumn: "Id",
                keyValue: 1L);

            migrationBuilder.DeleteData(
                table: "Workouts",
                keyColumn: "Id",
                keyValue: 2L);

            migrationBuilder.DeleteData(
                table: "Workouts",
                keyColumn: "Id",
                keyValue: 3L);

            migrationBuilder.DeleteData(
                table: "Workouts",
                keyColumn: "Id",
                keyValue: 4L);

            migrationBuilder.DeleteData(
                table: "Programs",
                keyColumn: "Id",
                keyValue: 1L);
        }
    }
}
