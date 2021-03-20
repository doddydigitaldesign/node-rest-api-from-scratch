import { ApiEndpoints } from "../consts";
import { Controllers, Endpoint } from "../types";

export const ApiControllers: Controllers = {
    Base: (request, response) => {
        response.statusCode = 200;
        response.setHeader("content-type", "text/html");
        response.setHeader("content-encoding", "utf-8");
        response.write(`
        <!DOCTYPE html>
        <html>
            <head>
                <title>Base | API</title>
            </head>
            <body>
                <h1>Welcome to the API</h1>
                <h2>Resources:</h2>
                <ul>
                    ${Object.entries(ApiEndpoints).reduce(
                        (list, [key, endpoint]: [string, Endpoint]) =>
                            list + `<li>${key}: ${endpoint.method} ${endpoint.path}</li>`,
                        ""
                    )}
                </ul>
            </body>
        </html>
        `);
        response.end(() => {
            console.log("Response sent for Base endpoint. 👍");
        });
    },
    Greet: (request, response) => {
        response.statusCode = 200;
        response.setHeader("content-type", "text/html");
        response.setHeader("content-encoding", "utf-8");
        response.write(`
        <!DOCTYPE html>
        <html>
            <head>
                <title>Greet | API</title>
            </head>
            <body>
                <h1>Hello there!</h1>
            </body>
        </html>
        `);
        response.end(() => {
            console.log("Response sent for Greet endpoint. 👍");
        });
    },
};
