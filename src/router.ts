import * as express from 'express';
import cors from 'cors';
import generateRoutes from './services/generateRoutes';
import findShortestRoundTripRoute from './services/findShortestRoundTripRoute';
import findShortRoundTrips from './services/findShortRoundTrips';
import shortRoundTripRoutes from './data/shortRoundTripRoutes';
import findSpecificRoute from './services/findSpecificRoute';

const Route = generateRoutes();

import app from './app';
app();

const findRoutes = (routes: any) => {
    if (routes && typeof routes === 'string') {
        console.log('tes22t', routes);
        try {
            return generateRoutes(JSON.parse(routes.replace('List', '')));
        } catch (e) {
            return;
        }
    } else {
        return generateRoutes(routes);
    }
};

class Router {
    constructor(server: express.Express) {
        const router = express.Router();

        router.get('/', (req: express.Request, res: express.Response) => {
            res.json({
                message: `try http://localhost:3000/swagger/#/default/get_findShortestRoundTripRoute`,
            });
        });

        router.get('/findShortestRoundTripRoute', cors(), (req: express.Request, res: express.Response) => {
            let result = {};
            let { stop, routes } = req.query;
            if (stop) {
                const settings = {
                    start: String(stop),
                    end: String(stop),
                };

                let route = findRoutes(routes);

                if (route) {
                    result = findShortestRoundTripRoute(
                        route,
                        route.getStop(settings.start),
                        0,
                        settings,
                        0,
                        Infinity,
                        true,
                        0,
                        [],
                    );
                } else {
                    result = { error: true, message: 'Invalid routes provided' };
                }
            } else {
                result = { error: true, message: 'Missing required params' };
            }
            res.json({
                result,
            });
        });

        router.get('/findShortRoundTrips', cors(), (req: express.Request, res: express.Response) => {
            let result = {};
            let { maxStops, maxDistance, target, routes, trips, checkKey } = req.query;
            if (target && checkKey) {
                const settings = {
                    trips,
                    maxStops: maxStops ? Number(maxStops) : Infinity,
                    maxDistance: maxDistance ? Number(maxDistance) : Infinity,
                    target: String(target),
                    checkKey: String(checkKey),
                    condition: (arr: any, settings: any) => arr.length <= settings[settings.checkKey] + 1,
                };

                try {
                    if (typeof trips === 'string') {
                        trips = JSON.parse(trips.replace('List', ''));
                    } else {
                        trips = shortRoundTripRoutes;
                    }
                } catch (e) {
                    trips = shortRoundTripRoutes;
                }

                let route = findRoutes(routes);

                if (route) {
                    result = findShortRoundTrips(route, settings, trips);
                } else {
                    result = { error: true, message: 'Invalid routes provided' };
                }
            } else {
                result = { error: true, message: 'Missing required params' };
            }
            res.json({
                result,
            });
        });

        router.get('/findSpecificRoute', cors(), (req: express.Request, res: express.Response) => {
            let result = {};
            let { end, maxStops, start, routes } = req.query;
            if (start && end && maxStops) {
                const settings = {
                    start: String(start),
                    end: String(end),
                    maxStops: Number(maxStops),
                };

                let route = findRoutes(routes);
                if (route) {
                    result = findSpecificRoute(route, settings);
                } else {
                    result = { error: true, message: 'Invalid routes provided' };
                }
            } else {
                result = { error: true, message: 'Missing required params' };
            }
            res.json({
                result,
            });
        });

        server.use('/', router);
    }
}

export default Router;
