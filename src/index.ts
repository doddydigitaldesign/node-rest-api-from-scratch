const http = require("http");
import { IncomingMessage, ServerResponse } from "node:http";
import { ApiEndpoints, EndpointLookup } from "../consts";
import { Endpoints, EndpointsLookup, HTTPMethod } from "../types";
import { ApiControllers } from "./controllers";
import { staticHandler } from "./static";

const HOST = "127.0.0.1";
const PORT = 8080;

const server = http.createServer();

server.on(
    "request",
    async (request: IncomingMessage, response: ServerResponse) => {
        const requestUrl = request.url as Endpoints[keyof Endpoints]["path"];
        const requestMethod = request.method as HTTPMethod.GET;

        // i.e. "GET /api/v1"
        const requestEndpoint: keyof EndpointsLookup = `${requestMethod} ${requestUrl}` as const;

        console.log(requestEndpoint);

        const endpointName = EndpointLookup[requestEndpoint];

        const filenames = ["index.html", "styles.css"];

        const userRegexp = new RegExp(/\/api\/v1\/[0-10000]/g);

        if (request.url === "/" || filenames.includes(request.url?.split("/")[1] ?? "foo")) {
            await staticHandler(request, response);
        } else if (userRegexp.test(request.url!)) {
            response.statusCode = 200;
            response.write("User: " + request.url!.split("/")[3]);
            response.end();
        } else if (ApiEndpoints[endpointName]) {
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
    }
);

server.listen(PORT, HOST, 0, () => {
    console.log(`Server running on: http://${HOST}:${PORT}`);
});
