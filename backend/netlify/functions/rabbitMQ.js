"use strict";

const amqp = require('amqplib');

// Abre una conexión, ejecuta fn(channel) y siempre cierra la conexión.
async function withChannel(fn) {
  const conn = await amqp.connect(process.env.CLOUDAMQP_URL);
  try {
    const channel = await conn.createConfirmChannel();
    return await fn(channel);
  } finally {
    await conn.close();
  }
}

// Envía el mensaje a la cola como JSON válido (comillas dobles),
// para que JSON.parse pueda reconstruirlo en las funciones *Tasks.
function publish(queue, message) {
  return withChannel(async (channel) => {
    await channel.checkQueue(queue);
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
    await channel.waitForConfirms();
  });
}

module.exports = { withChannel, publish };
