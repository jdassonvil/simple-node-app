const http = require('http');

const hostname = '0.0.0.0';
const port = 3000;
const mongoAddress = process.env.MONGODB_ADDRESS || "10.0.0.1";

var MongoClient = require('mongodb').MongoClient;
var url = `mongodb://${mongoAddress}:27017/simplon`;

var getDBConnection = function(cb){
  MongoClient.connect(url, function(err, db) {
    if (err) {
      console.log('Connection to the database failed')
      console.log(err)
      process.exit(1)
    }
    cb(db)
  });
}

var getMessageFromDB = function(cb){
   getDBConnection(function(db){
     var dbo = db.db("simplon");
     dbo.collection("messages").findOne({}, function(err, result) {
      if (err) throw err;
      cb(result)
    });
   });
}

const server = http.createServer((req, res) => {
  console.log("request received");
	var message = 'No message configured';
  getMessageFromDB(function(result){
    if (result != null){
      message = result.message
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(message);
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
  getDBConnection(function(db){
    console.log(`Connection with the database at ${url} is OK`);
    db.close();
  });
});
