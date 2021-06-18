import Route from './Route';
declare class Stop {
    name: string;
    routes: Route[];
    constructor(name: string);
    addRoute(stop: string, distance: number): void;
    getRoute(stop: string): Route | undefined;
    getRoutes(): Route[];
}
export default Stop;
