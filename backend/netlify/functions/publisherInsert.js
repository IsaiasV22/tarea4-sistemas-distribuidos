"use strict"

const headers = require('./headersCORS');
const { publish } = require('./rabbitMQ');

const queue = "publishers";

exports.handler = async (event, context) => {

  if (event.httpMethod == "OPTIONS") {
    return { statusCode: 200, headers, body: "OK" };
  }

  try {
    const body = JSON.parse(event.body);

    await publish(queue, { method: "INSERT", body });

    return { statusCode: 200, headers, body: 'OK'};
  } catch (error) {
    console.log(error);
    return { statusCode: 422, headers, body: JSON.stringify({ error: error.message }) };
  }
};
