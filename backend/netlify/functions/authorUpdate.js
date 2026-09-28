"use strict"

const headers = require('./headersCORS');
const { publish } = require('./rabbitMQ');

const queue = "authors";

exports.handler = async (event, context) => {

  if (event.httpMethod == "OPTIONS") {
    return { statusCode: 200, headers, body: "OK" };
  }

  try {
    const id = parseInt(event.path.split("/").reverse()[0]);
    const body = JSON.parse(event.body);

    await publish(queue, { method: "UPDATE", id, body });

    return { statusCode: 200, headers, body: 'OK'};
  } catch (error) {
    console.log(error);
    return { statusCode: 422, headers, body: JSON.stringify({ error: error.message }) };
  }
};
