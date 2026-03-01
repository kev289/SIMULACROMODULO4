CREATE DATABASE IF NOT EXISTS SaludPlus;
USE SaludPlus;

-- 1. Tabla de Médicos
CREATE TABLE IF NOT EXISTS doctors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    specialty VARCHAR(100) NOT NULL
);

-- 2. Tabla de Pacientes
CREATE TABLE IF NOT EXISTS patients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(20),
    address TEXT
);

-- 3. Tabla de Aseguradoras (¡La que faltaba!)
CREATE TABLE IF NOT EXISTS insurances (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- 4. Tabla de Citas (Relaciona todo)
CREATE TABLE IF NOT EXISTS appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    appointment_id VARCHAR(50) NOT NULL UNIQUE,
    patient_email VARCHAR(100),
    insurance_name VARCHAR(100), 
    amount_paid DECIMAL(10,2)
);