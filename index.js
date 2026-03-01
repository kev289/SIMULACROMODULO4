const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');
const upload = require('./config/multer'); 
const { db } = require('./config/db');
const History = require('./models/History');

const app = express();

// Middlewares
// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- RUTA DE MIGRACIÓN (POSTMAN) ---
app.post('/api/migrate', upload.single('archivo'), (req, res) => {
    
    // Validar que el archivo llegó
    if (!req.file) {
        return res.status(400).json({ error: "No se recibió el archivo CSV en la llave 'archivo'" });
    }

    const pathArchivo = req.file.path;
    let filasProcesadas = 0;

    // Procesar el flujo de datos del CSV
    fs.createReadStream(pathArchivo)
        .pipe(csv())
        .on('data', (fila) => {
            // 1. INSERTAR EN MYSQL (Relacional)
            
            // Tabla Doctors (Usando nombres de tu CSV)
            db.query('INSERT IGNORE INTO doctors (name, email, specialty) VALUES (?, ?, ?)', 
                [fila.doctor_name, fila.doctor_email, fila.specialty]);
            
            // Tabla Patients
            db.query('INSERT IGNORE INTO patients (name, email, phone, address) VALUES (?, ?, ?, ?)', 
                [fila.patient_name, fila.patient_email, fila.patient_phone, fila.patient_address]);

            // Tabla Insurances (Aseguradoras)
            db.query('INSERT IGNORE INTO insurances (name) VALUES (?)', 
                [fila.insurance_provider]);

            // Tabla Appointments (Citas)
            db.query('INSERT IGNORE INTO appointments (appointment_id, patient_email, insurance_name, amount_paid) VALUES (?, ?, ?, ?)', 
                [fila.appointment_id, fila.patient_email, fila.insurance_provider, fila.amount_paid]);

            // 2. INSERTAR/ACTUALIZAR EN MONGO DB (NoSQL - Historial Clínico)
            History.findOneAndUpdate(
                { patientEmail: fila.patient_email },
                { 
                    $set: { patientName: fila.patient_name },
                    $addToSet: { 
                        appointments: {
                            appointmentId: fila.appointment_id,
                            date: fila.appointment_date,
                            doctorName: fila.doctor_name,
                            treatment: fila.treatment_description,
                            cost: Number(fila.treatment_cost),
                            paid: Number(fila.amount_paid)
                        }
                    }
                },
                { upsert: true }
            ).exec();

            filasProcesadas++;
        })
        .on('end', () => {
            // Borrar archivo temporal de la carpeta uploads
            if (fs.existsSync(pathArchivo)) {
                fs.unlinkSync(pathArchivo);
            }
            
            console.log(`✅ Migración finalizada: ${filasProcesadas} filas procesadas.`);
            return res.json({ 
                message: "Migración exitosa", 
                detalles: `Se procesaron ${filasProcesadas} registros correctamente.` 
            });
        })
        .on('error', (err) => {
            console.error("Error procesando el CSV:", err);
            return res.status(500).json({ error: "Error interno al leer el archivo" });
        });
});

// --- RUTAS DE CONSULTA (REPORTE) ---

// 1. Obtener ingresos por aseguradora (MySQL)
app.get('/api/reports/revenue', (req, res) => {
    const sql = 'SELECT insurance_name, SUM(amount_paid) as total_revenue FROM appointments GROUP BY insurance_name';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// 2. Obtener historial de un paciente (MongoDB)
app.get('/api/patients/:email/history', async (req, res) => {
    try {
        const history = await History.findOne({ patientEmail: req.params.email });
        res.json(history);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Iniciar Servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(` Servidor SaludPlus corriendo en http://localhost:${PORT}`);
});