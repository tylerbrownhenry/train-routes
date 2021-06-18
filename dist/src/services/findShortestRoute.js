"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const findShortestRoute = (Routes, stop, distanceToStop, settings, distanceToHere, shortestDistance) => {
    distanceToHere = distanceToHere + distanceToStop;
    if (distanceToHere < shortestDistance) {
        // Can keep looking
        if (stop.name === settings.end) {
            // New shortest path
            return distanceToHere;
        }
        else {
            // Keep looking for the end
            stop.getRoutes().forEach((route) => {
                shortestDistance = findShortestRoute(Routes, Routes.getStop(route.name), route.distance, settings, distanceToHere, shortestDistance);
            });
        }
    }
    return shortestDistance;
};
exports.default = findShortestRoute;
//# sourceMappingURL=findShortestRoute.js.map