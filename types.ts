import { IncomingMessage, ServerResponse } from "node:http";
import type { ApiBasePath } from "./consts";

export type ApiBasePath = typeof ApiBasePath;

/**
 * An endpoint consists of an HTTP method and resource path
 */
export type Endpoint<P extends string = "", M extends HTTPMethod = HTTPMethod> = {
    method: M;
    path: `${ApiBasePath}${P}`;
};

/**
 * Strongly typed endpoints
 */
export interface Endpoints {
    Base: Endpoint<"", HTTPMethod.GET>;
    Greet: Endpoint<"/greet", HTTPMethod.GET>;
}

/**
 * Strongly typed reverse endpoints lookup
 */

export type EndpointsLookup<T extends keyof Endpoints = keyof Endpoints> = {
    [key in `${Endpoints[T]["method"]} ${Endpoints[T]["path"]}`]: T;
};

export type Controller = (
    request: IncomingMessage,
    response: ServerResponse
) => void;

/**
 * Each endpoint has a corresponding controller
 */
export type Controllers = {
    [key in keyof Endpoints]: Controller
};

export enum HTTPMethod {
    /**
     * The `CONNECT` method establishes a tunnel to the server identified by the
     * target resource.
     */
    CONNECT = "CONNECT",

    /**
     * The `DELETE` method deletes the specified resource.
     */
    DELETE = "DELETE",

    /**
     * The `GET` method requests a representation of the specified resource.
     * Requests using GET should only retrieve data.
     */
    GET = "GET",

    /**
     * The `HEAD` method asks for a response identical to that of a GET request,
     * but without the response body.
     */
    HEAD = "HEAD",

    /**
     * The `OPTIONS` method is used to describe the communication options for the
     * target resource.
     */
    OPTIONS = "OPTIONS",

    /**
     * The PATCH method is used to apply partial modifications to a resource.
     */
    PATCH = "PATCH",

    /**
     * The `POST` method is used to submit an entity to the specified resource,
     * often causing a change in state or side effects on the server.
     */
    POST = "POST",

    /**
     * The `PUT` method replaces all current representations of the target
     * resource with the request payload.
     */
    PUT = "PUT",

    /**
     * The `TRACE` method performs a message loop-back test along the path to the
     * target resource.
     */
    TRACE = "TRACE",
}
