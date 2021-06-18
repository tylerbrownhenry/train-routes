import Stop from './Stop';
declare class Route {
    name: string;
    stops: Stop[];
    distance: number;
    constructor(name: string, distance?: number);
    getDistance(): number;
    getStop(name: string): Stop | undefined;
    addStopRoute(start: string, end: string, distance: number): void;
}
export default Route;
