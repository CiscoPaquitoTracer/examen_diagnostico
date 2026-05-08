const API_URL = 'http://localhost:3001/api/estudiantes';

// Cargar estudiantes al iniciar
document.addEventListener('DOMContentLoaded', cargarEstudiantes);

// Enviar formulario
document.getElementById('estudiante-form').addEventListener('submit', guardarEstudiante);

// Cargar estudiantes
async function cargarEstudiantes() {
    try {
        const response = await fetch(API_URL);
        const estudiantes = await response.json();
        mostrarEstudiantes(estudiantes);
    } catch (error) {
        console.error('Error al cargar estudiantes:', error);
        alert('Error al cargar los estudiantes');
    }
}

// Mostrar estudiantes en la tabla
function mostrarEstudiantes(estudiantes) {
    const tablaBody = document.getElementById('tabla-body');
    tablaBody.innerHTML = '';

    if (estudiantes.length === 0) {
        tablaBody.innerHTML = '<tr><td colspan="6" style="text-align: center; color: #999;">No hay estudiantes registrados</td></tr>';
        return;
    }

    estudiantes.forEach(estudiante => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${estudiante.id}</td>
            <td>${estudiante.nombre}</td>
            <td>${estudiante.edad}</td>
            <td>${estudiante.carrera}</td>
            <td>${estudiante.cuatrimestre}</td>
            <td>
                <button class="btn btn-edit" onclick="editarEstudiante(${estudiante.id})">Editar</button>
                <button class="btn btn-delete" onclick="eliminarEstudiante(${estudiante.id})">Eliminar</button>
            </td>
        `;
        tablaBody.appendChild(fila);
    });
}

// Guardar estudiante (crear o actualizar)
async function guardarEstudiante(e) {
    e.preventDefault();

    const id = document.getElementById('id-estudiante').value;
    const nombre = document.getElementById('nombre').value;
    const edad = document.getElementById('edad').value;
    const carrera = document.getElementById('carrera').value;
    const cuatrimestre = document.getElementById('cuatrimestre').value;

    const datos = { nombre, edad, carrera, cuatrimestre };

    try {
        let response;
        if (id) {
            // Actualizar
            response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datos)
            });
        } else {
            // Crear nuevo
            response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datos)
            });
        }

        if (response.ok) {
            alert(id ? 'Estudiante actualizado' : 'Estudiante creado');
            limpiarFormulario();
            cargarEstudiantes();
        } else {
            alert('Error al guardar');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al guardar el estudiante');
    }
}

// Editar estudiante
async function editarEstudiante(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        const estudiante = await response.json();

        document.getElementById('id-estudiante').value = estudiante.id;
        document.getElementById('nombre').value = estudiante.nombre;
        document.getElementById('edad').value = estudiante.edad;
        document.getElementById('carrera').value = estudiante.carrera;
        document.getElementById('cuatrimestre').value = estudiante.cuatrimestre;

        // Scroll al formulario
        document.querySelector('.form-section').scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        console.error('Error:', error);
        alert('Error al cargar el estudiante');
    }
}

// Eliminar estudiante
async function eliminarEstudiante(id) {
    if (!confirm('¿Estás seguro de que quieres eliminar este estudiante?')) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Estudiante eliminado');
            cargarEstudiantes();
        } else {
            alert('Error al eliminar');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al eliminar el estudiante');
    }
}

// Limpiar formulario
function limpiarFormulario() {
    document.getElementById('estudiante-form').reset();
    document.getElementById('id-estudiante').value = '';
}