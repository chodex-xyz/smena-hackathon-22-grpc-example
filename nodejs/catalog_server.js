var PROTO_PATH = __dirname + '/catalog.proto';

var _ = require('lodash');
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


function listAlbums(call) {
    var album_list = [{title: '456'}, {title: '456'}, {title: '456'}]

    // For each feature, check if it is in the given bounding box
    _.each(album_list, function(album) {
        call.write(album);
    });
    call.end();
}

/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
function main() {
        var server = new grpc.Server();
        server.addService(catalog.service, {ListAlbums: listAlbums});

        server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
                server.start();
        });
}

main();
