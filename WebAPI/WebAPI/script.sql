IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220120172019_InitialMigration')
BEGIN
    CREATE TABLE [Programs] (
        [Id] bigint NOT NULL IDENTITY,
        [UserId] bigint NOT NULL,
        [Name] nvarchar(max) NOT NULL,
        CONSTRAINT [PK_Programs] PRIMARY KEY ([Id])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220120172019_InitialMigration')
BEGIN
    CREATE TABLE [Users] (
        [Id] bigint NOT NULL IDENTITY,
        [FirstName] nvarchar(max) NOT NULL,
        [LastName] nvarchar(max) NOT NULL,
        [Age] int NOT NULL,
        [Email] nvarchar(max) NOT NULL,
        [Password] nvarchar(max) NOT NULL,
        CONSTRAINT [PK_Users] PRIMARY KEY ([Id])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220120172019_InitialMigration')
BEGIN
    CREATE TABLE [Workouts] (
        [Id] bigint NOT NULL IDENTITY,
        [Name] nvarchar(max) NOT NULL,
        [ProgramId] bigint NOT NULL,
        CONSTRAINT [PK_Workouts] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_Workouts_Programs_ProgramId] FOREIGN KEY ([ProgramId]) REFERENCES [Programs] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220120172019_InitialMigration')
BEGIN
    CREATE TABLE [RefreshToken] (
        [Id] int NOT NULL IDENTITY,
        [Token] nvarchar(max) NULL,
        [Expires] datetime2 NOT NULL,
        [Created] datetime2 NOT NULL,
        [CreatedByIp] nvarchar(max) NULL,
        [Revoked] datetime2 NULL,
        [RevokedByIp] nvarchar(max) NULL,
        [ReplacedByToken] nvarchar(max) NULL,
        [ReasonRevoked] nvarchar(max) NULL,
        [UserId] bigint NOT NULL,
        CONSTRAINT [PK_RefreshToken] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_RefreshToken_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220120172019_InitialMigration')
BEGIN
    CREATE TABLE [Exercises] (
        [Id] bigint NOT NULL IDENTITY,
        [Name] nvarchar(max) NOT NULL,
        [Sets] int NOT NULL,
        [Reps] nvarchar(max) NOT NULL,
        [Rest] int NOT NULL,
        [WorkoutId] bigint NOT NULL,
        CONSTRAINT [PK_Exercises] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_Exercises_Workouts_WorkoutId] FOREIGN KEY ([WorkoutId]) REFERENCES [Workouts] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220120172019_InitialMigration')
BEGIN
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'Name', N'UserId') AND [object_id] = OBJECT_ID(N'[Programs]'))
        SET IDENTITY_INSERT [Programs] ON;
    EXEC(N'INSERT INTO [Programs] ([Id], [Name], [UserId])
    VALUES (CAST(1 AS bigint), N''Program nr1'', CAST(1 AS bigint))');
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'Name', N'UserId') AND [object_id] = OBJECT_ID(N'[Programs]'))
        SET IDENTITY_INSERT [Programs] OFF;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220120172019_InitialMigration')
BEGIN
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'Name', N'ProgramId') AND [object_id] = OBJECT_ID(N'[Workouts]'))
        SET IDENTITY_INSERT [Workouts] ON;
    EXEC(N'INSERT INTO [Workouts] ([Id], [Name], [ProgramId])
    VALUES (CAST(1 AS bigint), N''Workout nr1'', CAST(1 AS bigint)),
    (CAST(2 AS bigint), N''Workout nr2'', CAST(1 AS bigint)),
    (CAST(3 AS bigint), N''Workout nr3'', CAST(1 AS bigint)),
    (CAST(4 AS bigint), N''Workout nr4'', CAST(1 AS bigint))');
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'Name', N'ProgramId') AND [object_id] = OBJECT_ID(N'[Workouts]'))
        SET IDENTITY_INSERT [Workouts] OFF;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220120172019_InitialMigration')
BEGIN
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'Name', N'Reps', N'Rest', N'Sets', N'WorkoutId') AND [object_id] = OBJECT_ID(N'[Exercises]'))
        SET IDENTITY_INSERT [Exercises] ON;
    EXEC(N'INSERT INTO [Exercises] ([Id], [Name], [Reps], [Rest], [Sets], [WorkoutId])
    VALUES (CAST(1 AS bigint), N''Exercise nr1'', N''12, 12, 12, 12'', 90, 4, CAST(1 AS bigint)),
    (CAST(2 AS bigint), N''Exercise nr2'', N''12, 12, 12, 12'', 90, 4, CAST(1 AS bigint)),
    (CAST(3 AS bigint), N''Exercise nr3'', N''12, 12, 12, 12'', 90, 4, CAST(1 AS bigint)),
    (CAST(4 AS bigint), N''Exercise nr4'', N''12, 12, 12, 12'', 90, 4, CAST(1 AS bigint)),
    (CAST(5 AS bigint), N''Exercise nr1'', N''12, 12, 12, 12'', 90, 4, CAST(2 AS bigint)),
    (CAST(6 AS bigint), N''Exercise nr2'', N''12, 12, 12, 12'', 90, 4, CAST(2 AS bigint)),
    (CAST(7 AS bigint), N''Exercise nr3'', N''12, 12, 12, 12'', 90, 4, CAST(2 AS bigint)),
    (CAST(8 AS bigint), N''Exercise nr4'', N''12, 12, 12, 12'', 90, 4, CAST(2 AS bigint)),
    (CAST(9 AS bigint), N''Exercise nr1'', N''12, 12, 12, 12'', 90, 4, CAST(3 AS bigint)),
    (CAST(10 AS bigint), N''Exercise nr2'', N''12, 12, 12, 12'', 90, 4, CAST(3 AS bigint)),
    (CAST(11 AS bigint), N''Exercise nr3'', N''12, 12, 12, 12'', 90, 4, CAST(3 AS bigint)),
    (CAST(12 AS bigint), N''Exercise nr4'', N''12, 12, 12, 12'', 90, 4, CAST(3 AS bigint)),
    (CAST(13 AS bigint), N''Exercise nr1'', N''12, 12, 12, 12'', 90, 4, CAST(4 AS bigint)),
    (CAST(14 AS bigint), N''Exercise nr2'', N''12, 12, 12, 12'', 90, 4, CAST(4 AS bigint)),
    (CAST(15 AS bigint), N''Exercise nr3'', N''12, 12, 12, 12'', 90, 4, CAST(4 AS bigint)),
    (CAST(16 AS bigint), N''Exercise nr4'', N''12, 12, 12, 12'', 90, 4, CAST(4 AS bigint))');
    IF EXISTS (SELECT * FROM [sys].[identity_columns] WHERE [name] IN (N'Id', N'Name', N'Reps', N'Rest', N'Sets', N'WorkoutId') AND [object_id] = OBJECT_ID(N'[Exercises]'))
        SET IDENTITY_INSERT [Exercises] OFF;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220120172019_InitialMigration')
BEGIN
    CREATE INDEX [IX_Exercises_WorkoutId] ON [Exercises] ([WorkoutId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220120172019_InitialMigration')
BEGIN
    CREATE INDEX [IX_RefreshToken_UserId] ON [RefreshToken] ([UserId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220120172019_InitialMigration')
BEGIN
    CREATE INDEX [IX_Workouts_ProgramId] ON [Workouts] ([ProgramId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220120172019_InitialMigration')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20220120172019_InitialMigration', N'6.0.1');
END;
GO

COMMIT;
GO

