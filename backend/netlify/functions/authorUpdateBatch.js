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
    const a = JSON.parse(event.body);

    await sql`UPDATE authors SET
      author = ${a.author}, nationality = ${a.nationality},
      birth_year = ${num(a.birth_year)}, fields = ${a.fields}
      WHERE id = ${id}`;

    return { statusCode: 200, headers, body: 'OK'};
  } catch (error) {
    console.log(error);
    return { statusCode: 422, headers, body: JSON.stringify({ error: error.message }) };
  }
};
