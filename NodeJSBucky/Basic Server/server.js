var http = require('http');

function onRequest(request, response) {
    console.log("A user made a request" + request.url);
    response.writeHead(200, {"Context-Type": "text/plain"});
    response.write("Here is some data");
    response.end();
    //The test will show on http://localhost:8888/
}

http.createServer(onRequest).listen(8888);
console.log("Server is now running");