using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Application.Migrations
{
    public partial class renamedApplicationsDbSet : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Applications_Users_UserId",
                table: "Applications");

            migrationBuilder.DropForeignKey(
                name: "FK_Ratings_Applications_TrainerId",
                table: "Ratings");

            //migrationBuilder.DropTable(
            //    name: "ExerciseNames");

            //migrationBuilder.DropTable(
            //    name: "RefreshToken");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Applications",
                table: "Applications");

            migrationBuilder.RenameTable(
                name: "Applications",
                newName: "TrainerApplications");

            migrationBuilder.RenameIndex(
                name: "IX_Applications_UserId",
                table: "TrainerApplications",
                newName: "IX_TrainerApplications_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TrainerApplications",
                table: "TrainerApplications",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Ratings_TrainerApplications_TrainerId",
                table: "Ratings",
                column: "TrainerId",
                principalTable: "TrainerApplications",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_TrainerApplications_Users_UserId",
                table: "TrainerApplications",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ratings_TrainerApplications_TrainerId",
                table: "Ratings");

            migrationBuilder.DropForeignKey(
                name: "FK_TrainerApplications_Users_UserId",
                table: "TrainerApplications");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TrainerApplications",
                table: "TrainerApplications");

            migrationBuilder.RenameTable(
                name: "TrainerApplications",
                newName: "Applications");

            migrationBuilder.RenameIndex(
                name: "IX_TrainerApplications_UserId",
                table: "Applications",
                newName: "IX_Applications_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Applications",
                table: "Applications",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "ExerciseNames",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExerciseNames", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RefreshToken",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedByIp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Expires = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ReasonRevoked = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ReplacedByToken = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Revoked = table.Column<DateTime>(type: "datetime2", nullable: true),
                    RevokedByIp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Token = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RefreshToken", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RefreshToken_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RefreshToken_UserId",
                table: "RefreshToken",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Applications_Users_UserId",
                table: "Applications",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Ratings_Applications_TrainerId",
                table: "Ratings",
                column: "TrainerId",
                principalTable: "Applications",
                principalColumn: "Id");
        }
    }
}
