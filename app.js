



const routes = ["AB5", "BC4", "CD8", "DC8", "DE6",  "AD5", "CE2", "EB3", "AE7"];
// input = 



// 1. The distance of the route A-B-C.  
// 2. The distance of the route A-D.  
// 3. The distance of the route A-D-C.  
// 4. The distance of the route A-E-B-C-D.  
// 5. The distance of the route A-E-D. 

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
    console.log(start, end, next, distance, routeObject);
    if(routeObject[start] && routeObject[start][end]){
        distance += routeObject[start][end];
        console.log(start, end, next, distance);
        if(next.length > 0){
            return findRoute(end, next.shift(), next, distance);
        } else {
            return distance;
        }
    } else {
        
        return 'NO SUCH ROUTE';
    }
}

const perparedDistanceRequest = (routes) => {
    let output = [];
    defaultRoutes.forEach((routeText)=>{
        if(typeof routeText === 'string'){
            const routeArr = routeText.split('');
            output.push(findRoute(routeArr.shift(), routeArr.shift(), routeArr, 0))
        } else {
            output.push("INPUT WAS NOT A STRING")
        }
    })
    return output;
}

const response = perparedDistanceRequest(defaultRoutes);

console.log('HI',response);
if(response.length > 0){
    response.forEach((route)=>{
        console.log(route);
    })
}