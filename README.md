# tarea4-sistemas-distribuidos

Bookstore con actualizaciones diferidas mediante RabbitMQ (CloudAMQP): libros, autores y editoriales.

- **Frontend (Vercel):** `<pendiente>`
- **Backend (Netlify Functions):** `<pendiente>`

## Estructura

- `backend/`: sitio de Netlify que solo contiene funciones (`netlify/functions/`).
  - `XFind` y `XFindAll` leen de Neon (Postgres).
  - `XInsert`, `XUpdate` y `XDelete` publican un mensaje JSON en la cola del recurso.
  - `XTasks` vacía la cola e invoca `XInsertBatch`, `XUpdateBatch` y `XDeleteBatch`, que escriben en Neon.
- `frontend/`: SPA en Vue 3 + Vite.

| Recurso | Cola | Función de tareas |
|---|---|---|
| Libros | `bookstore` | `bookTasks` |
| Autores | `authors` | `authorTasks` |
| Editoriales | `publishers` | `publisherTasks` |

## Configuración

1. En CloudAMQP (Rabbit Manager → Queues), cree las colas `bookstore`, `authors` y `publishers`.
2. En el SQL Editor de Neon, ejecute `backend/schema.sql`.
3. En Netlify, use el directorio base `backend/` y defina las variables `DATABASE_URL` y `CLOUDAMQP_URL`.
4. En Vercel, use el directorio raíz `frontend/` y defina `VITE_API_URL` con la URL del sitio de Netlify.

Para correr el frontend en local:

```
cd frontend
npm install
npm run dev
```

Necesita un archivo `.env` con `VITE_API_URL`.

## Procesar la cola

Abra en el navegador `https://<sitio>.netlify.app/.netlify/functions/bookTasks` (o `authorTasks`, `publisherTasks`). Responde `{"processed": N}` con la cantidad de mensajes procesados.
