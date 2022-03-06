﻿// <auto-generated />
using System;
using Application.DatabaseContext;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Application.Migrations
{
    [DbContext(typeof(WebContext))]
    [Migration("20220305180940_addedFieldsToTrainerApplication")]
    partial class addedFieldsToTrainerApplication
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.1")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("Domain.Entities.Exercise", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"), 1L, 1);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Reps")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Rest")
                        .HasColumnType("int");

                    b.Property<int>("Sets")
                        .HasColumnType("int");

                    b.Property<long>("WorkoutId")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.HasIndex("WorkoutId");

                    b.ToTable("Exercises");

                    b.HasData(
                        new
                        {
                            Id = 1L,
                            Name = "Exercise nr1",
                            Reps = "12, 12, 12, 12",
                            Rest = 90,
                            Sets = 4,
                            WorkoutId = 1L
                        },
                        new
                        {
                            Id = 2L,
                            Name = "Exercise nr2",
                            Reps = "12, 12, 12, 12",
                            Rest = 90,
                            Sets = 4,
                            WorkoutId = 1L
                        },
                        new
                        {
                            Id = 3L,
                            Name = "Exercise nr3",
                            Reps = "12, 12, 12, 12",
                            Rest = 90,
                            Sets = 4,
                            WorkoutId = 1L
                        },
                        new
                        {
                            Id = 4L,
                            Name = "Exercise nr4",
                            Reps = "12, 12, 12, 12",
                            Rest = 90,
                            Sets = 4,
                            WorkoutId = 1L
                        },
                        new
                        {
                            Id = 5L,
                            Name = "Exercise nr1",
                            Reps = "12, 12, 12, 12",
                            Rest = 90,
                            Sets = 4,
                            WorkoutId = 2L
                        },
                        new
                        {
                            Id = 6L,
                            Name = "Exercise nr2",
                            Reps = "12, 12, 12, 12",
                            Rest = 90,
                            Sets = 4,
                            WorkoutId = 2L
                        },
                        new
                        {
                            Id = 7L,
                            Name = "Exercise nr3",
                            Reps = "12, 12, 12, 12",
                            Rest = 90,
                            Sets = 4,
                            WorkoutId = 2L
                        },
                        new
                        {
                            Id = 8L,
                            Name = "Exercise nr4",
                            Reps = "12, 12, 12, 12",
                            Rest = 90,
                            Sets = 4,
                            WorkoutId = 2L
                        },
                        new
                        {
                            Id = 9L,
                            Name = "Exercise nr1",
                            Reps = "12, 12, 12, 12",
                            Rest = 90,
                            Sets = 4,
                            WorkoutId = 3L
                        },
                        new
                        {
                            Id = 10L,
                            Name = "Exercise nr2",
                            Reps = "12, 12, 12, 12",
                            Rest = 90,
                            Sets = 4,
                            WorkoutId = 3L
                        },
                        new
                        {
                            Id = 11L,
                            Name = "Exercise nr3",
                            Reps = "12, 12, 12, 12",
                            Rest = 90,
                            Sets = 4,
                            WorkoutId = 3L
                        },
                        new
                        {
                            Id = 12L,
                            Name = "Exercise nr4",
                            Reps = "12, 12, 12, 12",
                            Rest = 90,
                            Sets = 4,
                            WorkoutId = 3L
                        },
                        new
                        {
                            Id = 13L,
                            Name = "Exercise nr1",
                            Reps = "12, 12, 12, 12",
                            Rest = 90,
                            Sets = 4,
                            WorkoutId = 4L
                        },
                        new
                        {
                            Id = 14L,
                            Name = "Exercise nr2",
                            Reps = "12, 12, 12, 12",
                            Rest = 90,
                            Sets = 4,
                            WorkoutId = 4L
                        },
                        new
                        {
                            Id = 15L,
                            Name = "Exercise nr3",
                            Reps = "12, 12, 12, 12",
                            Rest = 90,
                            Sets = 4,
                            WorkoutId = 4L
                        },
                        new
                        {
                            Id = 16L,
                            Name = "Exercise nr4",
                            Reps = "12, 12, 12, 12",
                            Rest = 90,
                            Sets = 4,
                            WorkoutId = 4L
                        });
                });

            modelBuilder.Entity("Domain.Entities.TrainerApplication", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"), 1L, 1);

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ProfileImage")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Qualifications")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<long>("UserId")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Applications");
                });

            modelBuilder.Entity("Domain.Entities.User", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"), 1L, 1);

                    b.Property<int>("Age")
                        .HasColumnType("int");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Role")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Domain.Entities.WorkoutDay", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"), 1L, 1);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<long>("ProgramId")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.HasIndex("ProgramId");

                    b.ToTable("Workouts");

                    b.HasData(
                        new
                        {
                            Id = 1L,
                            Name = "Workout nr1",
                            ProgramId = 1L
                        },
                        new
                        {
                            Id = 2L,
                            Name = "Workout nr2",
                            ProgramId = 1L
                        },
                        new
                        {
                            Id = 3L,
                            Name = "Workout nr3",
                            ProgramId = 1L
                        },
                        new
                        {
                            Id = 4L,
                            Name = "Workout nr4",
                            ProgramId = 1L
                        });
                });

            modelBuilder.Entity("Domain.Entities.WorkoutProgram", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"), 1L, 1);

                    b.Property<bool>("IsPublic")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<long>("UserId")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.ToTable("Programs");

                    b.HasData(
                        new
                        {
                            Id = 1L,
                            IsPublic = false,
                            Name = "Program nr1",
                            UserId = 1L
                        });
                });

            modelBuilder.Entity("Domain.Entities.Exercise", b =>
                {
                    b.HasOne("Domain.Entities.WorkoutDay", "WorkoutDay")
                        .WithMany("Exercises")
                        .HasForeignKey("WorkoutId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("WorkoutDay");
                });

            modelBuilder.Entity("Domain.Entities.TrainerApplication", b =>
                {
                    b.HasOne("Domain.Entities.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("Domain.Entities.User", b =>
                {
                    b.OwnsMany("Domain.Entities.RefreshToken", "RefreshTokens", b1 =>
                        {
                            b1.Property<int>("Id")
                                .ValueGeneratedOnAdd()
                                .HasColumnType("int");

                            SqlServerPropertyBuilderExtensions.UseIdentityColumn(b1.Property<int>("Id"), 1L, 1);

                            b1.Property<DateTime>("Created")
                                .HasColumnType("datetime2");

                            b1.Property<string>("CreatedByIp")
                                .HasColumnType("nvarchar(max)");

                            b1.Property<DateTime>("Expires")
                                .HasColumnType("datetime2");

                            b1.Property<string>("ReasonRevoked")
                                .HasColumnType("nvarchar(max)");

                            b1.Property<string>("ReplacedByToken")
                                .HasColumnType("nvarchar(max)");

                            b1.Property<DateTime?>("Revoked")
                                .HasColumnType("datetime2");

                            b1.Property<string>("RevokedByIp")
                                .HasColumnType("nvarchar(max)");

                            b1.Property<string>("Token")
                                .HasColumnType("nvarchar(max)");

                            b1.Property<long>("UserId")
                                .HasColumnType("bigint");

                            b1.HasKey("Id");

                            b1.HasIndex("UserId");

                            b1.ToTable("RefreshToken");

                            b1.WithOwner()
                                .HasForeignKey("UserId");
                        });

                    b.Navigation("RefreshTokens");
                });

            modelBuilder.Entity("Domain.Entities.WorkoutDay", b =>
                {
                    b.HasOne("Domain.Entities.WorkoutProgram", "WorkoutProgram")
                        .WithMany("Workouts")
                        .HasForeignKey("ProgramId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("WorkoutProgram");
                });

            modelBuilder.Entity("Domain.Entities.WorkoutDay", b =>
                {
                    b.Navigation("Exercises");
                });

            modelBuilder.Entity("Domain.Entities.WorkoutProgram", b =>
                {
                    b.Navigation("Workouts");
                });
#pragma warning restore 612, 618
        }
    }
}
