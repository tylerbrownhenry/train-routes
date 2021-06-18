import Route from '../classes/Route';
import routes from '../data/routes';

const parseInput = (val: string, response: Route) => {
    let points = val.split('');
    const start = points.shift();
    const end = points.shift();
    const distance = points.join();
    if (start && end && distance) {
        response.addStopRoute(start, end, Number(distance));
    }
    return response;
};

const loopInput = (input: string[]) => {
    // loop through input
    let response = new Route('parent');
    if (input && Array.isArray(input)) {
        input.forEach((route) => (response = parseInput(route, response)));
    } else {
        console.log('NO INPUT WAS PROVIDED');
    }
    return response;
};

const generateRoutes = (input = routes) => {
    return loopInput(input);
};

export default generateRoutes;
