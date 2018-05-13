const path = require('path');
const grpc = require('grpc');

const PROTO_PATH = {};
PROTO_PATH.test = path.join(__dirname, '/protos/testproto.proto');
PROTO_PATH.other = path.join(__dirname, '/protos/other.proto');
console.log(__dirname);

const testProto = grpc.load(PROTO_PATH.test).testPackage;
const otherProto = grpc.load(PROTO_PATH.other).otherPackage;

let count = 0;

setInterval(() => {
  console.log(count);
  count = 0;
}, 1000 * 60 * 10);

const testReply = (call, callback) => {
  console.log(call);
  callback(null, {message: 'ack ' + call.request.name, number: 42});
}

const otherReply = (call, callback) => {
  count++;
  callback(null, {message: 'got it ' + call.request.name, number: 13});
}

const app = () => {
  let server = new grpc.Server();
  server.addService(testProto.testService.service, {
    testTrigger: testReply
  });
  server.addService(otherProto.otherService.service, {
    otherTrigger: otherReply
  });
  var ssl_creds = grpc.credentials.createSsl()
  server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
  server.start();
  console.log('server started');
};

app();