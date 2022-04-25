using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Application.Migrations
{
    public partial class addedTrainerIdToRatings : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ratings_Programs_ProgramId",
                table: "Ratings");

            migrationBuilder.AlterColumn<long>(
                name: "ProgramId",
                table: "Ratings",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AddColumn<long>(
                name: "TrainerId",
                table: "Ratings",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Ratings_TrainerId",
                table: "Ratings",
                column: "TrainerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Ratings_Applications_TrainerId",
                table: "Ratings",
                column: "TrainerId",
                principalTable: "Applications",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Ratings_Programs_ProgramId",
                table: "Ratings",
                column: "ProgramId",
                principalTable: "Programs",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ratings_Applications_TrainerId",
                table: "Ratings");

            migrationBuilder.DropForeignKey(
                name: "FK_Ratings_Programs_ProgramId",
                table: "Ratings");

            migrationBuilder.DropIndex(
                name: "IX_Ratings_TrainerId",
                table: "Ratings");

            migrationBuilder.DropColumn(
                name: "TrainerId",
                table: "Ratings");

            migrationBuilder.AlterColumn<long>(
                name: "ProgramId",
                table: "Ratings",
                type: "bigint",
                nullable: false,
                defaultValue: 0L,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Ratings_Programs_ProgramId",
                table: "Ratings",
                column: "ProgramId",
                principalTable: "Programs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
