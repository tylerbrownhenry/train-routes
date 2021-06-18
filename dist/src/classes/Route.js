"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Stop_1 = __importDefault(require("./Stop"));
class Route {
    constructor(name, distance = 0) {
        this.name = name;
        this.stops = [];
        this.distance = Number(distance);
    }
    getDistance() {
        return this.distance;
    }
    getStop(name) {
        return this.stops.find(stop => stop.name === name);
    }
    addStopRoute(start, end, distance) {
        let stop = this.getStop(start);
        if (!stop) {
            stop = new Stop_1.default(start);
            this.stops.push(stop);
        }
        stop.addRoute(end, distance);
    }
}
exports.default = Route;
//# sourceMappingURL=Route.js.map