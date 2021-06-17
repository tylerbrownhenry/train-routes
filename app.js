



const routes = ["AB5", "BC4", "CD8", "DC8", "DE6",  "AD5", "CE2", "EB3", "AE7"];
const shortRoundTripSettings = {
    maxStops: 3,
    maxDistance: 30,
    target: 'C',
}
const shortRoundTripRoutes = ["CDC", "CEBC", "CEBCDC", "CDCEBC", "CDEBC", "CEBCEBC",  "CEBCEBCEBC"]


let routesObj = {};

const parseInput = (val, response) => {
    let points = val.split('');
    const start = points.shift();
    const end = points.shift();
    const distance = points.join();
    if(!response[start]){
        response[start] = {}
    }
    response[start][end] = Number(distance);
    return response;
}

const loopInput = (input, routes )=> {
    // loop through input
    let response = {};
    if(input && Array.isArray(input)){
        input.forEach((route)=> response = parseInput(route, response))
    } else {
        console.log('NO INPUT WAS PROVIDED');
    }
    return response;
}

const routeObject = loopInput(routes);
const defaultRoutes = ["ABC", "AD","ADC","AEBCD","AED"];

const findRoute = (start, end, next, distance) => {
    if(routeObject[start] && routeObject[start][end]){
        distance += routeObject[start][end];
        if(next.length > 0){
            return findRoute(end, next.shift(), next, distance);
        } else {
            return distance;
        }
    } else {
        
        return `NO SUCH ROUTE [${start}${end}]`;
    }
}

const perparedDistanceRequest = (routes) => {
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

const responses = perparedDistanceRequest(defaultRoutes);
responses.push(findShortRoundTrips(shortRoundTripSettings, shortRoundTripRoutes));

if(responses.length > 0){
    responses.forEach((response, i)=>{
        console.log(`OUTPUT #${i+1}: ` + response);
    })
}
