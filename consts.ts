import { Endpoints, EndpointsLookup, HTTPMethod } from "./types";

export const ApiBasePath = "/api/v1";

export const ApiEndpoints: Endpoints = {
    Base: { method: HTTPMethod.GET, path: "/api/v1" },
    Greet: { method: HTTPMethod.GET, path: "/api/v1/greet" },
};

/**
 * Used for checking that an incoming request has a valid path and method
 */
export const EndpointLookup = Object.entries(ApiEndpoints).reduce(
    (acc, endpoint) => ({
        ...acc,
        [`${endpoint[1].method} ${endpoint[1].path}`]: endpoint[0],
    }),
    {} as EndpointsLookup<keyof Endpoints>
);
