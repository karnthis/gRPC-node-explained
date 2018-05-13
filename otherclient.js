const path = require('path');
const grpc = require('grpc');

const PROTO_PATH = path.join(__dirname, '/protos/other.proto');

const otherProto = grpc.load(PROTO_PATH).otherPackage;

const app = () => {
  // let client = new otherProto.otherService('node1.do1.squirrellogic.com:50051', grpc.credentials.createInsecure());
  let client = new otherProto.otherService('localhost:50051', grpc.credentials.createInsecure());
  let user;
  if (process.argv.length >= 3) {
    user = process.argv[2];
  } else {
    user = 'dave';
  }
  setInterval(() => {
    
    client.otherTrigger({name: user}, (err, res) => {
      //console.log(res)
      if (err) {
        console.log(err);
      }
      console.log(res);
      //console.log('Response Message: ', res.message);
      //console.log('Response Number: ', res.number)
    })
  }, 1000 * 60);
  
};

app();