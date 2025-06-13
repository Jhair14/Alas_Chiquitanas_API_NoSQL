-- Script para configurar la base de datos Alas Chiquitanas
-- Ejecutar este script en SQL Server Management Studio o mediante sqlcmd

-- Crear la base de datos (descomenta si no existe)
-- CREATE DATABASE Alas_Chiquitanas;
-- GO

-- Usar la base de datos
USE Alas_Chiquitanas;
GO

-- Eliminar tablas si existen (para reiniciar)
IF OBJECT_ID('dbo.ReporteRecurso', 'U') IS NOT NULL 
    DROP TABLE dbo.ReporteRecurso;
GO

IF OBJECT_ID('dbo.ReporteRapido', 'U') IS NOT NULL 
    DROP TABLE dbo.ReporteRapido;
GO

IF OBJECT_ID('dbo.Recursos', 'U') IS NOT NULL 
    DROP TABLE dbo.Recursos;
GO

-- Crear tabla de Recursos
CREATE TABLE Recursos (
    recurso_id INT IDENTITY(1,1) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    cantidad INT NOT NULL
);
GO

-- Crear tabla de ReporteRapido
CREATE TABLE ReporteRapido (
    reporte_id INT IDENTITY(1,1) PRIMARY KEY,
    usuario_id VARCHAR(100) NOT NULL, 
    nombre_incidente VARCHAR(100),
    controlado BIT NOT NULL,
    extension VARCHAR(50) NOT NULL,
    condiciones_clima VARCHAR(100) NOT NULL,
    numero_bomberos INT,
    necesita_mas_bomberos BIT NOT NULL DEFAULT 0,
    apoyo_externo VARCHAR(100) NOT NULL,
    comentario_adicional VARCHAR(500),
    fecha_reporte DATETIME DEFAULT GETDATE()
);
GO

-- Crear tabla de relación ReporteRecurso
CREATE TABLE ReporteRecurso (
    reporte_id INT,
    recurso_id INT,
    PRIMARY KEY (reporte_id, recurso_id),
    FOREIGN KEY (reporte_id) REFERENCES ReporteRapido(reporte_id) ON DELETE CASCADE,
    FOREIGN KEY (recurso_id) REFERENCES Recursos(recurso_id) ON DELETE CASCADE
);
GO

-- Insertar datos de ejemplo en Recursos
INSERT INTO Recursos (nombre, cantidad) VALUES 
('Manguera contra incendios 25m', 10),
('Extintores ABC', 15),
('Cascos de seguridad', 20),
('Botas ignífugas', 25),
('Chaquetas de protección', 20);
GO

-- Insertar datos de ejemplo en ReporteRapido
INSERT INTO ReporteRapido (
    usuario_id, nombre_incidente, controlado, extension, 
    condiciones_clima, numero_bomberos, necesita_mas_bomberos, 
    apoyo_externo, comentario_adicional
) VALUES 
(
    'bombero_001', 
    'Incendio forestal sector norte', 
    0, 
    '3 hectáreas', 
    'Viento moderado, temperatura 28°C', 
    5, 
    1, 
    'Requiere apoyo aéreo', 
    'Incendio en expansión, vegetación seca'
),
(
    'bombero_002', 
    'Conato de incendio en pastizal', 
    1, 
    '0.5 hectáreas', 
    'Sin viento, temperatura 25°C', 
    3, 
    0, 
    'No requiere apoyo adicional', 
    'Incendio controlado rápidamente'
);
GO

-- Insertar datos de ejemplo en ReporteRecurso
INSERT INTO ReporteRecurso (reporte_id, recurso_id) VALUES 
(1, 1), -- Reporte 1 usa Manguera contra incendios
(1, 2), -- Reporte 1 usa Extintores ABC
(1, 3), -- Reporte 1 usa Cascos de seguridad
(2, 2), -- Reporte 2 usa Extintores ABC
(2, 5); -- Reporte 2 usa Chaquetas de protección
GO

-- Verificar que las tablas se crearon correctamente
SELECT 'Recursos' as Tabla, COUNT(*) as Registros FROM Recursos
UNION ALL
SELECT 'ReporteRapido' as Tabla, COUNT(*) as Registros FROM ReporteRapido
UNION ALL
SELECT 'ReporteRecurso' as Tabla, COUNT(*) as Registros FROM ReporteRecurso;
GO

PRINT 'Base de datos configurada exitosamente!';
GO 