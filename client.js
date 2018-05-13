const path = require('path');
const grpc = require('grpc');

const PROTO_PATH = path.join(__dirname, '/protos/testproto.proto');

const testProto = grpc.load(PROTO_PATH).testPackage;

const app = () => {
  let client = new testProto.testService('localhost:50051', var ssl_creds = grpc.credentials.createSsl());
  let user;
  if (process.argv.length >= 3) {
    user = process.argv[2];
  } else {
    user = 'dave';
  }
  client.testTrigger({name: user}, (err, res) => {
    //console.log(res)
    console.log('Response Message: ', res.message);
    console.log('Response Number: ', res.number)
  })
};

app();