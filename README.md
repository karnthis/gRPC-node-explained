#Modified sample Node gRPC

##About this project
This rose out of trying to understand the stock example given by the official docs for how to set up gRPC. Everything was labled "Hello World", and it was hard to see how things connected.

This contains paths for two very basic clients, Test and Other. I have tried to label everything clearly. 

Contributions are welcome!

##How to use the project
All you need to do to get started is run `npm install`. There is only one dependancy. Once installed, `npm start` in a terminal window to start the server, and `node client.js` or `node otherclient.js` run a client. Both clients accept a custom **name** argument, so for example `node client.js Susan`, and will default to Dave if none is supplied.

##Breakdown
Heres the rundown on how things are set up.
###In Server.js
*A proto is loaded using `grpc.load(pathToProto).protoPackageName`
*A function is set up with `(call, callback)` params. The callback is set up as `callback(null, {formatFromYourProto})`
*Data from the input is accessible using `call.request.elementName`
*Function is defined with a `server` using `new grpc.Server()`
*Server sets up paths by linking a Trigger to a function, using `server.addService(importedProto.serviceName.service, {triggerName: functionName})`
###In Other.proto
*The package and service names are defined
*Messages are defined, at least two. They follow the format `elementType elementName = elementNumber`. These message formats are what is used in server.js within your function.
*The service names a trigger, which expects a message and returns a message.