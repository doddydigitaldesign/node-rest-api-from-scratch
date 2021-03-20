import { Controller } from "../types";
import fs = require("fs");

export const getFileContentsAsString = async (filePath: string) => {
    let contents = await new Promise((resolve, reject) => {
        fs.readFile(
            filePath,
            (err, data) => {
                if (err) return;

                resolve(data);
            }
        );
    });

    return contents as Buffer;
};

export const staticHandler: Controller = async (request, response) => {
    const filePath =
        request.url === "/"
            ? "public/index.html"
            : `public/${request.url!.split("/")[1]}`;
    const fileContent = await getFileContentsAsString(filePath);

    response.statusCode = 200;
    if (request.url === "/") {
        response.setHeader("content-type", "text/html");
    } else if (request.url?.endsWith(".css")) {
        response.setHeader("content-type", "text/css");
    }
    response.setHeader("content-encoding", "utf-8");
    response.write(fileContent);

    response.end();
};
