📘 Tasks API – NestJS + Prisma

API REST construida con NestJS y Prisma ORM, implementando un CRUD completo para la gestión de tareas, con arquitectura en capas, validación con DTOs y buenas prácticas de desarrollo.

🚀 Tecnologías utilizadas

Node.js

NestJS

TypeScript

Prisma ORM

PostgreSQL

class-validator / class-transformer

⚙️ Configuración Inicial
1️⃣ Instalar dependencias
npm install

2️⃣ Configurar la base de datos

Crear o editar el archivo .env:

DATABASE_URL="postgresql://my_user:my_password@localhost:5432/tasks_db?schema=public"

3️⃣ Generar cliente Prisma
npx prisma generate

4️⃣ Ejecutar migraciones
npx prisma migrate dev --name init

5️⃣ Levantar el servidor
npm run start:dev


📍 La API estará disponible en:
👉 http://localhost:3000

🧪 Endpoints
➕ 1. Crear tarea
POST /tasks

Body

{
  "title": "Implementar login",
  "description": "Agregar autenticación JWT",
  "status": "pendiente"
}

📋 2. Obtener todas las tareas
GET /tasks
🔍 3. Obtener una tarea por ID
GET /tasks/:id

Ejemplo:

GET http://localhost:3000/tasks/1

✏️ 4. Actualizar una tarea completa
PUT /tasks/:id

Body

{
  "title": "Nuevo título",
  "description": "Nueva descripción",
  "status": "completada"
}

🔄 5. Actualizar solo el estado
PATCH /tasks/:id

Body

{
  "status": "completada"
}

🗑️ 6. Eliminar una tarea
DELETE /tasks/:id
🧱 Validaciones Implementadas
📌 DTO: CreateTaskDto

title: requerido, string

description: opcional

status: enum (pendiente, completada)

📌 DTO: GetTaskByIdDto

id: entero, mínimo 1

📌 DTO: UpdateTaskStatusDto

status: enum obligatorio

🧠 Arquitectura Aplicada

Arquitectura en 3 capas + Repository:

1️⃣ Controller

Recibe la petición

Valida con DTOs

No contiene lógica de negocio

2️⃣ Service

Lógica de negocio

Validación de existencia

Manejo de errores (NotFoundException)

3️⃣ Repository

Interacción directa con Prisma

CRUD sobre la base de datos

🛡️ Validación Global

En main.ts:

app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }),
);


✔ Solo se aceptan propiedades definidas en los DTO
✔ Conversión automática de tipos
✔ Respuestas claras con errores 400

🙋‍♂️ Autor

Andrés Pavas – Full Stack Developer
Prueba técnica NestJS + Prisma
