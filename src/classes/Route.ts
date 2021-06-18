import Stop from './Stop';

class Route {
    name: string
    stops: Stop[]
    distance: number

    constructor(name: string, distance = 0) {
        this.name = name;
        this.stops = []
        this.distance = Number(distance);
    }

    getDistance(){
        return this.distance;
    }

    getStop(name: string) {
        return this.stops.find(stop => stop.name === name);
    }

    addStopRoute(start: string, end: string, distance: number){
        let stop = this.getStop(start);
        if(!stop){
            stop = new Stop(start);
            this.stops.push(stop);
        }
        stop.addRoute(end, distance);
    }
}

export default Route;