"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(require("../classes/Route"));
const routes_1 = __importDefault(require("../data/routes"));
const parseInput = (val, response) => {
    let points = val.split('');
    const start = points.shift();
    const end = points.shift();
    const distance = points.join();
    if (start && end && distance) {
        response.addStopRoute(start, end, Number(distance));
    }
    return response;
};
const loopInput = (input) => {
    // loop through input
    let response = new Route_1.default('parent');
    if (input && Array.isArray(input)) {
        input.forEach((route) => (response = parseInput(route, response)));
    }
    else {
        console.log('NO INPUT WAS PROVIDED');
    }
    return response;
};
const generateRoutes = (input = routes_1.default) => {
    return loopInput(input);
};
exports.default = generateRoutes;
//# sourceMappingURL=generateRoutes.js.map