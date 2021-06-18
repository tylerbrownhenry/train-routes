"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const findRoute_1 = __importDefault(require("./findRoute"));
const findShortRoundTrips = (Routes, settings, inputData) => {
    return inputData.reduce((accumulator, route) => {
        const routeArr = route.split('');
        if (settings.condition(routeArr, settings)) {
            const start = routeArr[0];
            const end = routeArr[routeArr.length - 1];
            if (start === settings.target && end === settings.target) {
                const distance = findRoute_1.default(Routes, routeArr.shift(), routeArr.shift(), routeArr, 0);
                if (distance <= settings.maxDistance) {
                    accumulator++;
                }
            }
        }
        return accumulator;
    }, 0);
};
exports.default = findShortRoundTrips;
//# sourceMappingURL=findShortRoundTrips.js.map