import Route from '../classes/Route';

const findShortestRoundTripRoute = (
    Routes: any,
    stop: any,
    distanceToStop: number,
    settings: any,
    distanceToHere: number,
    shortestDistance: number,
    skipFirst: boolean,
    count: number,
    queue: any,
) => {
    if (distanceToHere > 1000) {
        // Error out if trying too hard
        // Note: I remembered I left this here, but would have liked to handle it differently, I added it temporarily
        // to fix it from throwing a stack overflow error, but really should just track the results of each iteration
        // will leave as is for now, but wanted to point it out
        return shortestDistance;
    }

    distanceToHere = distanceToHere + distanceToStop;
    if (distanceToHere < shortestDistance) {
        // Can keep looking
        if (stop.name === settings.end && !skipFirst) {
            // New shortest path
            return distanceToHere;
        } else {
            // Keep looking for the end
            Routes.getStop(stop.name)
                .getRoutes()
                .forEach((route: Route) => {
                    queue.push({ route, distance: distanceToHere });
                });

            const next = queue.pop();
            if (!next) {
                return shortestDistance;
            } else {
                // Super long line... but keeping for now
                shortestDistance = findShortestRoundTripRoute(
                    Routes,
                    Routes.getStop(next.route.name),
                    next.route.distance,
                    settings,
                    distanceToHere,
                    shortestDistance,
                    false,
                    count + 1,
                    queue,
                );
            }
        }
    }
    return shortestDistance;
};

export default findShortestRoundTripRoute;
