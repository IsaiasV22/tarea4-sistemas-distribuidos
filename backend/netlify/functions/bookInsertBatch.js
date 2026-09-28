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
    const b = JSON.parse(event.body);

    await sql`INSERT INTO books
      (id, title, edition, copyright, language, pages, author, author_id, publisher, publisher_id)
      VALUES (${num(b.id)}, ${b.title}, ${b.edition}, ${num(b.copyright)}, ${b.language},
              ${num(b.pages)}, ${b.author}, ${num(b.author_id)}, ${b.publisher}, ${num(b.publisher_id)})`;

    return { statusCode: 200, headers, body: 'OK'};
  } catch (error) {
    console.log(error);
    return { statusCode: 422, headers, body: JSON.stringify({ error: error.message }) };
  }
};
