const defaultRoutes = ["ABC", "AD","ADC","AEBCD","AED"];
const routes = ["AB5", "BC4", "CD8", "DC8", "DE6",  "AD5", "CE2", "EB3", "AE7"];
const shortRoundTripRoutes = ["CDC", "CEBC", "CEBCDC", "CDCEBC", "CDEBC", "CEBCEBC",  "CEBCEBCEBC"];

const shortRoundTripSettings = {
    maxStops: 3,
    maxDistance: 30,
    target: 'C',
};

const specificTripSettings = {
    exactly: 4,
    start: 'A',
    end: 'C',
    maxStops: 4,
};

const shortetsRouteTripSettings = {
    start: 'A',
    end: 'C',
};

const shortetsRouteRoundTripSettings = {
    start: 'B',
    end: 'B',
};

class Stop {
    constructor(name) {
      this.name = name;
      this.routes = [];
    }
    
    addRoute(stop, distance) {
      this.routes.push(new Route(stop, distance));
    }

    getRoute (stop){
        return this.routes.find(routes => routes.stop === stop);
    }

    getRoutes (){
        return this.routes;
    }
}

class Route {
    constructor(stop, distance = 0) {
        this.stop = stop;
        this.stops = []
        this.distance = Number(distance);
    }

    getDistance(){
        return this.distance;
    }

    getStop(name) {
        return this.stops.find(stop => stop.name === name);
    }

    addStopRoute(start, end, distance){
        let stop = this.getStop(start);
        if(!stop){
            stop = new Stop(start);
            this.stops.push(stop);
        }
        stop.addRoute(end, distance);
    }
}

const parseInput = (val, response) => {
    let points = val.split('');
    const start = points.shift();
    const end = points.shift();
    const distance = points.join();
    response.addStopRoute(start, end, distance);
    return response;
}

const loopInput = (input)=> {
    // loop through input
    let response = new Route();
    if(input && Array.isArray(input)){
        input.forEach((route)=> response = parseInput(route, response))
    } else {
        console.log('NO INPUT WAS PROVIDED');
    }
    return response;
}

const Routes = loopInput(routes);

const findRoute = (start, end, next, distance) => {
    const startStop = Routes.getStop(start);
    const endStop = startStop.getRoute(end);
    if(endStop){
        distance += endStop.getDistance();
        if(next.length > 0){
            return findRoute(end, next.shift(), next, distance);
        } else {
            return distance;
        }
    } else {  
        return `NO SUCH ROUTE [${start}${end}]`;
    }
}

const perparedDistanceRequest = (defaultRoutes) => {
    let output = [];
    defaultRoutes.forEach((routeText)=>{
        if(typeof routeText === 'string'){
            const routeArr = routeText.split('');
            let response = findRoute(routeArr.shift(), routeArr.shift(), routeArr, 0);
            output.push(response)
        } else {
            output.push("INPUT WAS NOT A STRING")
        }
    })
    return output;
}

const findShortRoundTrips = (settings, inputData) => {
    return inputData.reduce((accumulator, route, i) => {
        const routeArr = route.split('');
        if(routeArr.length <= settings.maxStops + 1){
            const start = routeArr[0];
            const end = routeArr[routeArr.length-1];
            if(start === settings.target && end === settings.target){
                const distance = findRoute(routeArr.shift(), routeArr.shift(), routeArr, 0);
                if(distance <= settings.maxDistance){
                    accumulator++;
                }
            }
        }
        return accumulator;
    },0);
}

const tripDiscovery = (stop, settings, count) => {
    let resp = 0;
    if (count > settings.maxStops) {
        // Gone too far
        return 0
    } else if (count === settings.maxStops) {
        // Must be there
        if (stop.name === settings.end){
            // We are there
            return 1
        } else {
            // We didn't make it
            return 0
        }
    } else {
        stop.getRoutes().forEach((route)=> {
            resp += tripDiscovery(Routes.getStop(route.stop), settings, count + 1, resp);
        });
    }
    return resp;
}

const findShortestRoute = (stop, distanceToStop, settings, distanceToHere, shortestDistance) => {
    distanceToHere = distanceToHere + distanceToStop;
    if(distanceToHere < shortestDistance){
        // Can keep looking
        if(stop.name === settings.end ){
            // New shortest path
            return distanceToHere;
        } else {
            // Keep looking for the end
            stop.getRoutes().forEach((route)=> {
                shortestDistance = findShortestRoute(Routes.getStop(route.stop), route.distance, settings, distanceToHere, shortestDistance);
            });
        }
    }
    return shortestDistance;
}

const findShortestRoundTripRoute = (stop, distanceToStop, settings, distanceToHere, shortestDistance, skipFirst, count, queue) => {
    distanceToHere = distanceToHere + distanceToStop;
    if(distanceToHere < shortestDistance){
        // Can keep looking
        if(stop.name === settings.end && !skipFirst){
            // New shortest path
            return distanceToHere;
        } else {
            // Keep looking for the end
            Routes.getStop(stop.name).getRoutes().forEach((route)=> {
                queue.push({route, distance: distanceToHere});
                console.log('keep4',);
            });

            const next = queue.pop();
            if(!next){
                return shortestDistance;
            } else {
                // Super long line... but keeping for now
                shortestDistance = findShortestRoundTripRoute(Routes.getStop(next.route.stop), next.route.distance, settings, distanceToHere, shortestDistance, false, count + 1, queue);
            }
        }
    }
    return shortestDistance;
}


const findSpecificRoute = (settings, Route) => {
    const stop = Routes.getStop(settings.start)
    return tripDiscovery(stop, settings, 0, 0); // this is excessive
}

const responses = perparedDistanceRequest(defaultRoutes);
responses.push(findShortRoundTrips(shortRoundTripSettings, shortRoundTripRoutes));
responses.push(findSpecificRoute(specificTripSettings, Routes));
responses.push(findShortestRoute(Routes.getStop(shortetsRouteTripSettings.start), 0, shortetsRouteTripSettings, 0, Infinity));
responses.push(findShortestRoundTripRoute(Routes.getStop(shortetsRouteRoundTripSettings.start), 0, shortetsRouteRoundTripSettings, 0, Infinity, true, 0, []));




10. The number of different routes from C to C with a distance of less than 30

// 9. The length of the shortest route (in terms of distance to travel) from B to B.

// 8. The length of the shortest route (in terms of distance to travel) from A to C.


if(responses.length > 0){
    responses.forEach((response, i)=>{
        console.log(`OUTPUT #${i+1}: ` + response);
    })
}
