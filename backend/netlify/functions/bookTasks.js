"use strict"

const headers = require('./headersCORS');
const { withChannel } = require('./rabbitMQ');

const queue = "bookstore";

exports.handler = async (event, context) => {

  if (event.httpMethod == "OPTIONS") {
    return { statusCode: 200, headers, body: "OK" };
  }

  // URL del propio sitio: Netlify la define en process.env.URL.
  const url = (process.env.URL || 'https://' + event.headers.host) + '/.netlify/functions/';

  try {
    const processed = await withChannel(async (channel) => {
      let count = 0;
      let message = await channel.get(queue, {'noAck':true});
      while (message) {
        const request = JSON.parse(message.content.toString());
        let response;
        switch (request.method) {
          case "DELETE":
            response = await fetch(url+'bookDeleteBatch/'+request.id, {
              method: "DELETE",
              headers: {"Content-type": "application/json"}});
            break;
          case "UPDATE":
            response = await fetch(url+'bookUpdateBatch/'+request.id, {
              headers: {"Content-type": "application/json"},
              method: "PUT", body: JSON.stringify(request.body)});
            break;
          case "INSERT":
            response = await fetch(url+'bookInsertBatch', {
              headers: {"Content-type": "application/json"},
              method: "POST", body: JSON.stringify(request.body)});
            break;
        }
        if (response && !response.ok)
          console.log(request.method, request.id, await response.text());
        count++;
        message = await channel.get(queue, {'noAck':true});
      }
      return count;
    });

    return { statusCode: 200, headers, body: JSON.stringify({ processed })};
  } catch (error) {
    console.log(error);
    return { statusCode: 422, headers, body: JSON.stringify({ error: error.message }) };
  }
};
