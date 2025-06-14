USE [master]
GO
/****** Object:  Database [alas_chiquitanas]    Script Date: 13/6/2025 03:55:04 ******/
CREATE DATABASE [alas_chiquitanas]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'alas_chiquitanas', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.JHAIR\MSSQL\DATA\alas_chiquitanas.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'alas_chiquitanas_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.JHAIR\MSSQL\DATA\alas_chiquitanas_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [alas_chiquitanas] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [alas_chiquitanas].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [alas_chiquitanas] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [alas_chiquitanas] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [alas_chiquitanas] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [alas_chiquitanas] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [alas_chiquitanas] SET ARITHABORT OFF 
GO
ALTER DATABASE [alas_chiquitanas] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [alas_chiquitanas] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [alas_chiquitanas] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [alas_chiquitanas] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [alas_chiquitanas] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [alas_chiquitanas] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [alas_chiquitanas] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [alas_chiquitanas] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [alas_chiquitanas] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [alas_chiquitanas] SET  ENABLE_BROKER 
GO
ALTER DATABASE [alas_chiquitanas] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [alas_chiquitanas] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [alas_chiquitanas] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [alas_chiquitanas] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [alas_chiquitanas] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [alas_chiquitanas] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [alas_chiquitanas] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [alas_chiquitanas] SET RECOVERY FULL 
GO
ALTER DATABASE [alas_chiquitanas] SET  MULTI_USER 
GO
ALTER DATABASE [alas_chiquitanas] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [alas_chiquitanas] SET DB_CHAINING OFF 
GO
ALTER DATABASE [alas_chiquitanas] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [alas_chiquitanas] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [alas_chiquitanas] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [alas_chiquitanas] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'alas_chiquitanas', N'ON'
GO
ALTER DATABASE [alas_chiquitanas] SET QUERY_STORE = ON
GO
ALTER DATABASE [alas_chiquitanas] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [alas_chiquitanas]
GO
/****** Object:  User [jhair]    Script Date: 13/6/2025 03:55:04 ******/
CREATE USER [jhair] FOR LOGIN [jhair] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [alas_api]    Script Date: 13/6/2025 03:55:04 ******/
CREATE USER [alas_api] FOR LOGIN [alas_api] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [jhair]
GO
ALTER ROLE [db_owner] ADD MEMBER [alas_api]
GO
/****** Object:  Table [dbo].[Recursos]    Script Date: 13/6/2025 03:55:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Recursos](
	[recurso_id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](100) NOT NULL,
	[cantidad] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[recurso_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ReporteRapido]    Script Date: 13/6/2025 03:55:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ReporteRapido](
	[reporte_id] [int] IDENTITY(1,1) NOT NULL,
	[usuario_id] [varchar](100) NOT NULL,
	[nombre_incidente] [varchar](100) NULL,
	[controlado] [bit] NOT NULL,
	[extension] [varchar](50) NOT NULL,
	[condiciones_clima] [varchar](100) NOT NULL,
	[numero_bomberos] [int] NULL,
	[necesita_mas_bomberos] [bit] NOT NULL,
	[apoyo_externo] [varchar](100) NOT NULL,
	[comentario_adicional] [varchar](500) NULL,
	[fecha_reporte] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[reporte_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ReporteRecurso]    Script Date: 13/6/2025 03:55:04 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ReporteRecurso](
	[reporte_id] [int] NOT NULL,
	[recurso_id] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[reporte_id] ASC,
	[recurso_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[ReporteRapido] ADD  DEFAULT ((0)) FOR [necesita_mas_bomberos]
GO
ALTER TABLE [dbo].[ReporteRapido] ADD  DEFAULT (getdate()) FOR [fecha_reporte]
GO
ALTER TABLE [dbo].[ReporteRecurso]  WITH CHECK ADD FOREIGN KEY([recurso_id])
REFERENCES [dbo].[Recursos] ([recurso_id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[ReporteRecurso]  WITH CHECK ADD FOREIGN KEY([reporte_id])
REFERENCES [dbo].[ReporteRapido] ([reporte_id])
ON DELETE CASCADE
GO
USE [master]
GO
ALTER DATABASE [alas_chiquitanas] SET  READ_WRITE 
GO
