📘 README – Tasks API (NestJS + Prisma)
📝 Descripción

Esta API implementa un CRUD completo para la gestión de tareas (Tasks), siguiendo buenas prácticas de NestJS, arquitectura en capas y validación con DTOs.
Incluye:

NestJS con estructura modular.

Prisma como ORM.

DTOs con validación usando class-validator.

Enum para estados permitidos.

Piped globales para sanitización y transformación.

Arquitectura: Controller → Service → Repository → Prisma.

Ideal para pruebas técnicas y proyectos base escalables.

🚀 Tecnologías utilizadas

Node.js

NestJS

TypeScript

Prisma ORM

SQLite / PostgreSQL (dependiendo del .env)

class-validator / class-transformer

📂 Estructura del proyecto
src/
 ├── tasks/
 │    ├── dto/
 │    │     ├── create-task.dto.ts
 │    │     ├── update-status.dto.ts
 │    │     └── get-taskById.dto.ts
 │    ├── enums/
 │    │     └── task-status.enum.ts
 │    ├── tasks.controller.ts
 │    ├── tasks.service.ts
 │    └── tasks.repository.ts
 ├── prisma/
 │    ├── schema.prisma
 ├── app.module.ts
 └── main.ts

⚙️ Configuración inicial
1️⃣ Instalar dependencias
npm install

2️⃣ Configurar la base de datos

Editar el archivo:

.env


Ejemplo con SQLite:

DATABASE_URL="file:./dev.db"

3️⃣ Generar cliente Prisma
npx prisma generate

4️⃣ Ejecutar migraciones
npx prisma migrate dev --name init

5️⃣ Levantar el servidor
npm run start:dev


La API correrá en:

http://localhost:3000

🧪 Endpoints

A continuación los endpoints implementados y ejemplos de prueba.

➕ 1. Crear tarea

POST /tasks

Body:
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

Body:
{
  "title": "Nuevo título",
  "description": "Nueva descripción",
  "status": "completada"
}

🔄 5. Actualizar solo el estado (PATCH)

PATCH /tasks/:id

Body:
{
  "status": "completada"
}

🗑️ 6. Eliminar una tarea

DELETE /tasks/:id

🧱 Validaciones implementadas
DTO: CreateTaskDto

title: requerido, string

description: opcional

status: enum obligatorio (pendiente, completada)

DTO: GetTaskByIdDto

id: entero, mínimo 1

DTO: UpdateTaskStatusDto

status: enum obligatorio

🧠 Arquitectura aplicada

Se utiliza una arquitectura en 3 capas:

Controller

Recibe la petición.

Valida con DTOs.

No contiene lógica de negocio.

Service

Contiene la lógica de negocio.

Valida existencia de entidades.

Lanza excepciones (NotFoundException).

Repository

Única capa que interactúa con Prisma.

CRUD directo en base de datos.

🛡️ Validación global

En main.ts se configura:

app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }),
);


Esto asegura:

✔ Solo se reciben las properties definidas en el DTO
✔ Conversión de tipos (id como number)
✔ Validación automática y respuestas 400 claras

🙋‍♂️ Autor

Andrés Pavas – Full Stack Developer
Prueba técnica NestJS + Prisma