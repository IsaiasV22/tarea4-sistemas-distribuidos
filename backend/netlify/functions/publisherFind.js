"use strict"

const sql = require('./db');
const headers = require('./headersCORS');

exports.handler = async (event, context) => {

  if (event.httpMethod == "OPTIONS") {
    return { statusCode: 200, headers, body: "OK" };
  }

  try {
    const id = parseInt(event.path.split("/").reverse()[0]);

    const publishers = await sql`SELECT * FROM publishers WHERE id = ${id}`;

    return { statusCode: 200, headers, body: JSON.stringify(publishers)};
  } catch (error) {
    console.log(error);
    return { statusCode: 400, headers, body: JSON.stringify({ error: error.message }) };
  }
};
