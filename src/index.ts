const http = require("http");
import { IncomingMessage, ServerResponse } from "node:http";
import { ApiEndpoints, EndpointLookup } from "../consts";
import { Endpoints, EndpointsLookup, HTTPMethod } from "../types";
import { ApiControllers } from "./controllers";

const HOST = "127.0.0.1";
const PORT = 8080;

const server = http.createServer();

server.on("request", (request: IncomingMessage, response: ServerResponse) => {
    const requestUrl = request.url as Endpoints[keyof Endpoints]["path"];
    const requestMethod = request.method as HTTPMethod.GET;
    
    // i.e. "GET /api/v1"
    const requestEndpoint: keyof EndpointsLookup = `${requestMethod} ${requestUrl}` as const;

    console.log(requestEndpoint);

    const endpointName = EndpointLookup[requestEndpoint];

    if (ApiEndpoints[endpointName]) {
        // Call the corresponding controller for the endpoint with
        // the request and response objects
        ApiControllers[endpointName](request, response);
    } else {
        // Send 404: Not found
        response.statusCode = 404;
        response.end(() => {
            console.log("Response ended, resource not found. 👎");
        });
    }
});

server.listen(PORT, HOST, 0, () => {
    console.log(`Server running on: http://${HOST}:${PORT}`);
});
