"use strict"

const sql = require('./db');
const headers = require('./headersCORS');

// Convierte "" o valores no numéricos en NULL para las columnas INTEGER.
const num = (value) => (value === "" || value == null || isNaN(value)) ? null : parseInt(value);

exports.handler = async (event, context) => {

  if (event.httpMethod == "OPTIONS") {
    return { statusCode: 200, headers, body: "OK" };
  }

  try {
    const id = parseInt(event.path.split("/").reverse()[0]);
    const b = JSON.parse(event.body);

    await sql`UPDATE books SET
      title = ${b.title}, edition = ${b.edition}, copyright = ${num(b.copyright)},
      language = ${b.language}, pages = ${num(b.pages)}, author = ${b.author},
      author_id = ${num(b.author_id)}, publisher = ${b.publisher}, publisher_id = ${num(b.publisher_id)}
      WHERE id = ${id}`;

    return { statusCode: 200, headers, body: 'OK'};
  } catch (error) {
    console.log(error);
    return { statusCode: 422, headers, body: JSON.stringify({ error: error.message }) };
  }
};
