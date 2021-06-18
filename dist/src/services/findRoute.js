"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const findRoute = (Routes, start, end, next, distance) => {
    const startStop = Routes.getStop(start);
    if (startStop) {
        const endStop = startStop.getRoute(end);
        if (endStop) {
            distance += endStop.getDistance();
            if (next.length > 0) {
                return findRoute(Routes, end, next.shift(), next, distance);
            }
            else {
                return distance;
            }
        }
    }
    return `NO SUCH ROUTE`;
};
exports.default = findRoute;
//# sourceMappingURL=findRoute.js.map