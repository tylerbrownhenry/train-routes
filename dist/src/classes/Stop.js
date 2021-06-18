"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(require("./Route"));
class Stop {
    constructor(name) {
        this.name = name;
        this.routes = [];
    }
    addRoute(stop, distance) {
        this.routes.push(new Route_1.default(stop, distance));
    }
    getRoute(stop) {
        return this.routes.find((routes) => routes.name === stop);
    }
    getRoutes() {
        return this.routes;
    }
}
exports.default = Stop;
//# sourceMappingURL=Stop.js.map