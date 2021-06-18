"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tripDiscovery = void 0;
const tripDiscovery = (Routes, stop, settings, count) => {
    let resp = 0;
    if (count > settings.maxStops) {
        // Gone too far
        return 0;
    }
    else if (count === settings.maxStops) {
        // Must be there
        if (stop.name === settings.end) {
            // We are there
            return 1;
        }
        else {
            // We didn't make it
            return 0;
        }
    }
    else if (stop) {
        stop.getRoutes().forEach((route) => {
            resp += exports.tripDiscovery(Routes, Routes.getStop(route.name), settings, count + 1);
        });
    }
    return resp;
};
exports.tripDiscovery = tripDiscovery;
const findSpecificRoute = (Routes, settings) => {
    const stop = Routes.getStop(settings.start);
    return exports.tripDiscovery(Routes, stop, settings, 0); // this is excessive
};
exports.default = findSpecificRoute;
//# sourceMappingURL=findSpecificRoute.js.map