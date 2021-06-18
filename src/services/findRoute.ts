const findRoute = (Routes: any, start: any, end: any, next: any, distance: number): any => {
    const startStop = Routes.getStop(start);
    if (startStop) {
        const endStop = startStop.getRoute(end);
        if (endStop) {
            distance += endStop.getDistance();
            if (next.length > 0) {
                return findRoute(Routes, end, next.shift(), next, distance);
            } else {
                return distance;
            }
        }
    }
    return `NO SUCH ROUTE`;
};

export default findRoute;
