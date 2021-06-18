const findShortestRoute = (Routes: any, stop: any, distanceToStop: number, settings: any, distanceToHere: number, shortestDistance: number) => {
    distanceToHere = distanceToHere + distanceToStop;
    if(distanceToHere < shortestDistance){
        // Can keep looking
        if(stop.name === settings.end ){
            // New shortest path
            return distanceToHere;
        } else {
            // Keep looking for the end
            stop.getRoutes().forEach((route: any)=> {
                shortestDistance = findShortestRoute(Routes, Routes.getStop(route.name), route.distance, settings, distanceToHere, shortestDistance);
            });
        }
    }
    return shortestDistance;
}

export default findShortestRoute;