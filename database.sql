-- Crear base de datos
CREATE DATABASE IF NOT EXISTS crud_estudiantes;

-- Usar la base de datos
USE crud_estudiantes;

-- Crear tabla de estudiantes
CREATE TABLE IF NOT EXISTS estudiantes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    edad INT NOT NULL,
    carrera VARCHAR(100) NOT NULL,
    cuatrimestre INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insertar datos de ejemplo (opcional)
INSERT INTO estudiantes (nombre, edad, carrera, cuatrimestre) VALUES
('Juan Pérez', 20, 'Ingeniería en Sistemas', 4),
('María García', 19, 'Ingeniería en Sistemas', 2),
('Carlos López', 21, 'Administración de Empresas', 6),
('Ana Martínez', 20, 'Ingeniería en Sistemas', 3);