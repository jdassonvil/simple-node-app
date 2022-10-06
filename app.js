const http = require("http");
const process = require("process");
const { Client } = require("pg");

const client = new Client();
client.connect();

const hostname = "0.0.0.0";
const port = 3000;

process.on("SIGINT", (code) => {
  console.log("Process exit event with code: ", code);
  client.end();
  process.exit();
});

// https://node-postgres.com/features/connecting
var getMessageFromDB = function (cb) {
  client.query("SELECT * FROM messages", (err, res) => {
    if (err) {
      console.log(err.stack);
      cb([]);
    } else {
      cb(res.rows);
    }
  });
};

const server = http.createServer((req, res) => {
  console.log("request received");

  getMessageFromDB(function (messages) {
    var html_text = "<ul>";
    for (const message of messages) {
      html_text += "<li>" + message["text"] + "</li>";
    }
    html_text += "</ul>";

    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.end(html_text);
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
