# tarea4-sistemas-distribuidos

Bookstore con actualizaciones diferidas mediante RabbitMQ (CloudAMQP): libros, autores y editoriales.

- **Frontend (Vercel):** https://tarea4-sistemas-distribuidos.vercel.app/
- **Backend (Netlify Functions):** https://tarea4-sisdis-isaiasviquez.netlify.app

## Estructura

- `backend/`: sitio de Netlify que solo contiene funciones (`netlify/functions/`).
  - `XFind` y `XFindAll` leen de Neon (Postgres).
  - `XInsert`, `XUpdate` y `XDelete` publican un mensaje JSON en la cola del recurso.
  - `XTasks` vacía la cola e invoca `XInsertBatch`, `XUpdateBatch` y `XDeleteBatch`, que escriben en Neon.
- `frontend/`: SPA en Vue 3 + Vite.

| Recurso     | Cola         | Función de tareas |
| ----------- | ------------ | ----------------- |
| Libros      | `bookstore`  | `bookTasks`       |
| Autores     | `authors`    | `authorTasks`     |
| Editoriales | `publishers` | `publisherTasks`  |

## Despliegue

- **Mensajería:** CloudAMQP, con las colas `bookstore`, `authors` y `publishers`.
- **Base de datos:** Neon (Postgres). El esquema y los datos de ejemplo están en `backend/schema.sql`.
- **Backend:** Netlify, con directorio base `backend/` y las variables de entorno `DATABASE_URL` y `CLOUDAMQP_URL`.
- **Frontend:** Vercel, con directorio raíz `frontend/` y la variable `VITE_API_URL`, que apunta al sitio de Netlify.

## Procesamiento diferido

Las colas se procesan al invocar manualmente la función de tareas de cada recurso:

- https://tarea4-sisdis-isaiasviquez.netlify.app/.netlify/functions/bookTasks
- https://tarea4-sisdis-isaiasviquez.netlify.app/.netlify/functions/authorTasks
- https://tarea4-sisdis-isaiasviquez.netlify.app/.netlify/functions/publisherTasks

Cada una responde `{"processed": N}`, donde N es la cantidad de mensajes aplicados en la base de datos.
