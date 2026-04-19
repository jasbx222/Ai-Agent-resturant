import { Config, RouteParam, RouteParamsWithQueryOverload, Router } from 'ziggy-js';

declare global {
    var route: ((
        name?: string,
        params?: RouteParamsWithQueryOverload | RouteParam,
        absolute?: boolean,
        config?: Config,
    ) => string) & {
        current: (name?: string, params?: RouteParamsWithQueryOverload | RouteParam, config?: Config) => boolean;
        check: (name?: string) => boolean;
    };
}

export {};
