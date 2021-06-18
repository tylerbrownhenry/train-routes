export const tripDiscovery = (Routes: any, stop: any, settings: any, count: number) => {
    let resp = 0;
    if (count > settings.maxStops) {
        // Gone too far
        return 0;
    } else if (count === settings.maxStops) {
        // Must be there
        if (stop.name === settings.end) {
            // We are there
            return 1;
        } else {
            // We didn't make it
            return 0;
        }
    } else if (stop) {
        stop.getRoutes().forEach((route: any) => {
            resp += tripDiscovery(Routes, Routes.getStop(route.name), settings, count + 1);
        });
    }
    return resp;
};

const findSpecificRoute = (Routes: any, settings: any) => {
    const stop = Routes.getStop(settings.start);
    return tripDiscovery(Routes, stop, settings, 0); // this is excessive
};

export default findSpecificRoute;
