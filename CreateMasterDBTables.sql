USE [MasterDB]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

/* ============================================================
   Tables are created in dependency order:
   1. Departments   (no dependencies)
   2. Designations  (depends on Departments)
   3. Users         (depends on Departments and Designations)
   4. Login         (no dependencies)
   ============================================================ */


/****** Object:  Table [dbo].[Departments] ******/
CREATE TABLE [dbo].[Departments](
	[DeptID] [int] IDENTITY(1,1) NOT NULL,
	[DeptName] [varchar](50) NOT NULL,
	[isActive] [bit] NOT NULL,
 CONSTRAINT [PK_Departments] PRIMARY KEY CLUSTERED 
(
	[DeptID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Departments] ADD  CONSTRAINT [DF_Departments_isActive]  DEFAULT ((1)) FOR [isActive]
GO


/****** Object:  Table [dbo].[Designations] ******/
CREATE TABLE [dbo].[Designations](
	[DesigID] [int] IDENTITY(1,1) NOT NULL,
	[DesigName] [varchar](50) NOT NULL,
	[DeptID] [int] NOT NULL,
	[DeptName] [nvarchar](50) NULL,
 CONSTRAINT [PK_Designations] PRIMARY KEY CLUSTERED 
(
	[DesigID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Designations]  WITH CHECK ADD  CONSTRAINT [FK_Designations_Departments] FOREIGN KEY([DeptID])
REFERENCES [dbo].[Departments] ([DeptID])
GO

ALTER TABLE [dbo].[Designations] CHECK CONSTRAINT [FK_Designations_Departments]
GO


/****** Object:  Table [dbo].[Users] ******/
CREATE TABLE [dbo].[Users](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [varchar](50) NOT NULL,
	[LastName] [varchar](50) NOT NULL,
	[Phone] [int] NULL,
	[Address] [nvarchar](max) NULL,
	[DeptID] [int] NOT NULL,
	[DesigID] [int] NOT NULL,
	[isActive] [bit] NOT NULL,
	[Department] [nvarchar](100) NULL,
	[Designation] [nvarchar](100) NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[Users] ADD  CONSTRAINT [DF_Users_isActive]  DEFAULT ((1)) FOR [isActive]
GO

ALTER TABLE [dbo].[Users]  WITH CHECK ADD  CONSTRAINT [FK_Users_Departments] FOREIGN KEY([DeptID])
REFERENCES [dbo].[Departments] ([DeptID])
GO

ALTER TABLE [dbo].[Users] CHECK CONSTRAINT [FK_Users_Departments]
GO

ALTER TABLE [dbo].[Users]  WITH CHECK ADD  CONSTRAINT [FK_Users_Designations] FOREIGN KEY([DesigID])
REFERENCES [dbo].[Designations] ([DesigID])
GO

ALTER TABLE [dbo].[Users] CHECK CONSTRAINT [FK_Users_Designations]
GO


/****** Object:  Table [dbo].[Login] ******/
CREATE TABLE [dbo].[Login](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Username] [nvarchar](50) NOT NULL,
	[Password] [nvarchar](50) NOT NULL
) ON [PRIMARY]
GO


/* ============================================================
   Stored procedures (created after the tables they read from)
   ============================================================ */


/****** Object:  StoredProcedure [dbo].[GetDesignations] ******/
CREATE PROC [dbo].[GetDesignations]
AS
BEGIN
	SELECT DesigID, Designations.DeptID, Departments.DeptName, DesigName
	FROM Designations
	JOIN Departments ON Designations.DeptID = Departments.DeptID
END
GO


/****** Object:  StoredProcedure [dbo].[GetUsers] ******/
-- NOTE: the script provided for this procedure was an unfilled SSMS template
-- (<Procedure_Name>, <@Param1> ...), which is not valid SQL and fails to run.
-- This is a working replacement that returns all users with their columns.
-- Adjust the name and columns to match what your API expects.
CREATE PROCEDURE [dbo].[GetUsers]
AS
BEGIN
	SET NOCOUNT ON;

	SELECT ID, FirstName, LastName, Phone, Address,
	       DeptID, DesigID, isActive, Department, Designation
	FROM Users
END
GO


/* ============================================================
   Sample data
   IDs are generated automatically by the IDENTITY columns, so the ID
   column is left out of every INSERT. Rows are inserted in dependency
   order, so IDs come out as 1, 2, 3 ... in the order listed:
     Departments  -> HR=1, IT=2, Operations=3, Finance=4
     Designations -> HR Manager=1, Software Engineer=2, QA Engineer=3
   ============================================================ */


/****** Departments ******/
INSERT INTO [dbo].[Departments] ([DeptName], [isActive]) VALUES ('HR',         1);
INSERT INTO [dbo].[Departments] ([DeptName], [isActive]) VALUES ('IT',         0);
INSERT INTO [dbo].[Departments] ([DeptName], [isActive]) VALUES ('Operations', 0);
INSERT INTO [dbo].[Departments] ([DeptName], [isActive]) VALUES ('Finance',    1);
GO


/****** Designations (needs Departments) ******/
INSERT INTO [dbo].[Designations] ([DesigName], [DeptID], [DeptName]) VALUES ('HR Manager',        1, NULL);
INSERT INTO [dbo].[Designations] ([DesigName], [DeptID], [DeptName]) VALUES ('Software Engineer', 2, NULL);
INSERT INTO [dbo].[Designations] ([DesigName], [DeptID], [DeptName]) VALUES ('QA Engineer',       2, NULL);
GO


/****** Users (needs Departments and Designations) ******/
INSERT INTO [dbo].[Users] ([FirstName], [LastName], [Phone], [Address], [DeptID], [DesigID], [isActive], [Department], [Designation])
VALUES ('John',      'Doe',      1222223,   NULL,            1, 1, 0, 'HR', 'HR Manager');

INSERT INTO [dbo].[Users] ([FirstName], [LastName], [Phone], [Address], [DeptID], [DesigID], [isActive], [Department], [Designation])
VALUES ('Mary',      'Jane',     12345678,  'New York, USA', 2, 2, 1, 'IT', 'Software Engineer');

INSERT INTO [dbo].[Users] ([FirstName], [LastName], [Phone], [Address], [DeptID], [DesigID], [isActive], [Department], [Designation])
VALUES ('John',      'Taylor',   0,         'Melbourne',     2, 2, 1, 'IT', 'QA Engineer');

INSERT INTO [dbo].[Users] ([FirstName], [LastName], [Phone], [Address], [DeptID], [DesigID], [isActive], [Department], [Designation])
VALUES ('Andrew',    'Garfield', NULL,      'London',        1, 1, 0, NULL, NULL);

INSERT INTO [dbo].[Users] ([FirstName], [LastName], [Phone], [Address], [DeptID], [DesigID], [isActive], [Department], [Designation])
VALUES ('Rabia',     'Shah',     909098098, NULL,            2, 1, 1, NULL, NULL);

INSERT INTO [dbo].[Users] ([FirstName], [LastName], [Phone], [Address], [DeptID], [DesigID], [isActive], [Department], [Designation])
VALUES ('Charlotte', 'Brown',    555666777, 'San Francisco', 3, 1, 1, NULL, NULL);
GO


/****** Login ******/
INSERT INTO [dbo].[Login] ([Username], [Password]) VALUES ('admin',    '1234');
INSERT INTO [dbo].[Login] ([Username], [Password]) VALUES ('John Doe', '1234');
GO
