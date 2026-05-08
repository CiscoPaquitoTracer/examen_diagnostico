import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Configuración de conexión a MySQL
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root', // Cambia si tienes contraseña
    database: 'crud_estudiantes',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Rutas
// GET - Obtener todos los estudiantes
app.get('/api/estudiantes', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT * FROM estudiantes');
        connection.release();
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener estudiantes' });
    }
});

// GET - Obtener un estudiante por ID
app.get('/api/estudiantes/:id', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query('SELECT * FROM estudiantes WHERE id = ?', [req.params.id]);
        connection.release();
        if (rows.length === 0) {
            res.status(404).json({ error: 'Estudiante no encontrado' });
        } else {
            res.json(rows[0]);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener estudiante' });
    }
});

// POST - Crear un nuevo estudiante
app.post('/api/estudiantes', async (req, res) => {
    const { nombre, edad, carrera, cuatrimestre } = req.body;
    try {
        const connection = await pool.getConnection();
        await connection.query('INSERT INTO estudiantes (nombre, edad, carrera, cuatrimestre) VALUES (?, ?, ?, ?)', 
            [nombre, edad, carrera, cuatrimestre]);
        connection.release();
        res.json({ message: 'Estudiante creado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear estudiante' });
    }
});

// PUT - Actualizar un estudiante
app.put('/api/estudiantes/:id', async (req, res) => {
    const { nombre, edad, carrera, cuatrimestre } = req.body;
    try {
        const connection = await pool.getConnection();
        await connection.query('UPDATE estudiantes SET nombre = ?, edad = ?, carrera = ?, cuatrimestre = ? WHERE id = ?', 
            [nombre, edad, carrera, cuatrimestre, req.params.id]);
        connection.release();
        res.json({ message: 'Estudiante actualizado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar estudiante' });
    }
});

// DELETE - Eliminar un estudiante
app.delete('/api/estudiantes/:id', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        await connection.query('DELETE FROM estudiantes WHERE id = ?', [req.params.id]);
        connection.release();
        res.json({ message: 'Estudiante eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar estudiante' });
    }
});

// Ruta raíz
app.get('/', (req, res) => {
    res.sendFile('index.html');
});

app.listen(3001, () => {
    console.log('Servidor escuchando en el puerto 3001');
});