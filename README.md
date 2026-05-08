# CRUD Gestión de Estudiantes

## Descripción
Aplicación web completa para gestionar información de estudiantes. Permite crear, leer, actualizar y eliminar registros de estudiantes con campos: nombre, edad, carrera y cuatrimestre.

## Tecnologías Utilizadas
- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS3, JavaScript Vanilla
- **Base de Datos**: MySQL
- **Herramientas**: npm, MySQL Workbench

## Características principales
✅ Crear nuevos estudiantes  
✅ Visualizar lista completa de estudiantes  
✅ Editar información de estudiantes existentes  
✅ Eliminar estudiantes  
✅ Interfaz responsiva y amigable  
✅ Validación de formularios  
✅ API REST completa

## Instrucciones para ejecutar

### 1. Requisitos previos
- Node.js instalado
- MySQL Server instalado
- MySQL Workbench (opcional, pero recomendado)

### 2. Crear la base de datos
1. Abre MySQL Workbench
2. Conectate a tu servidor MySQL
3. Abre el archivo `database.sql`
4. Ejecuta el script completo (Ctrl + Enter o Ctrl + A + Ctrl + Enter)

O desde terminal MySQL:
```bash
mysql -u root -p < database.sql
```

### 3. Instalar dependencias del servidor
En la carpeta del proyecto, ejecuta:
```bash
npm install
```

Si hay problemas con permisos, usa:
```bash
npm install mysql2 cors
```

### 4. Configurar conexión a MySQL
En el archivo `index.js`, verifica las credenciales de conexión a MySQL (línea 13-19):
```javascript
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '', // Cambia si tienes contraseña
    database: 'crud_estudiantes',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
```

### 5. Iniciar el servidor
```bash
npm run dev
```

O directamente:
```bash
node index.js
```

El servidor se ejecutará en: `http://localhost:3001`

### 6. Acceder a la aplicación
Abre tu navegador en: `http://localhost:3001`

## Estructura del proyecto
```
examen_diagnostico/
├── index.js                 # Servidor Express y rutas API
├── package.json            # Dependencias del proyecto
├── database.sql            # Script para crear base de datos
├── README.md               # Este archivo
└── public/
    ├── index.html          # Página principal
    ├── styles.css          # Estilos CSS
    └── script.js           # Lógica del frontend
```

## Endpoints de la API

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/estudiantes` | Obtener todos los estudiantes |
| GET | `/api/estudiantes/:id` | Obtener un estudiante por ID |
| POST | `/api/estudiantes` | Crear un nuevo estudiante |
| PUT | `/api/estudiantes/:id` | Actualizar un estudiante |
| DELETE | `/api/estudiantes/:id` | Eliminar un estudiante |

## Cuerpo de JSON para POST/PUT
```json
{
    "nombre": "Juan",
    "edad": 20,
    "carrera": "Ingeniería en Sistemas",
    "cuatrimestre": 4
}
```

## Troubleshooting

**Error: "connect ECONNREFUSED"**
- Verifica que MySQL esté corriendo
- Comprueba las credenciales de conexión en `index.js`

**Error: "Unknown database 'crud_estudiantes'"**
- Ejecuta el script `database.sql` en MySQL Workbench
- Verifica que la base de datos se haya creado correctamente

**Error: "Cannot find module 'mysql2' or 'cors'"**
- Ejecuta `npm install` nuevamente
- Verifica que node_modules esté creado

## Evidencias

### Funcionalidades en acción
- Al hacer clic en "Guardar", se crea o actualiza el estudiante
- Al hacer clic en "Editar", se carga el formulario con los datos
- Al hacer clic en "Eliminar", solicita confirmación y elimina el registro
- La tabla se actualiza automáticamente

## Uso de IA

Se utilizó IA (GitHub Copilot) para:
- Generar vista para el crud
- Crear estilos CSS responsivos
- Documentación y README.md

## Notas
- La contraseña de MySQL está vacía por defecto. Si tienes contraseña, actualiza `index.js`
- La aplicación usa conexión en local. Para producción, considera usar variables de entorno
- Los datos están en tiempo real sincronizados con MySQL

## Autor
CiscoPaquitoTracer

## Licencia
ISC
