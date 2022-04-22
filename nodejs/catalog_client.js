var PROTO_PATH = __dirname + '/catalog.proto';

var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true
    });

var catalog = grpc.loadPackageDefinition(packageDefinition).Catalog;

function main() {
  var target = 'localhost:50051'

  var client = new catalog(target, grpc.credentials.createInsecure());

  var helloRequest = {name: 'kek'};

  client.ListAlbums(helloRequest, function(err, response) {
    console.log(response);
  });
}

main();
