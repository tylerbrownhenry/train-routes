import * as express from 'express'
import cors from 'cors'
import generateRoutes from './services/generateRoutes';
import findShortestRoundTripRoute from './services/findShortestRoundTripRoute'
import findShortRoundTrips from './services/findShortRoundTrips';
import shortRoundTripRoutes from './data/shortRoundTripRoutes';
import findSpecificRoute from './services/findSpecificRoute';

const Route = generateRoutes();

import app from './app';
app();

class Router {
    constructor(server: express.Express) {
        const router = express.Router()

        router.get('/', (req: express.Request, res: express.Response) => {
            res.json({
                message: `try http://localhost:3000/swagger/#/default/get_findShortestRoundTripRoute`
            })
        })
           
        router.get('/findShortestRoundTripRoute', cors(), (req: express.Request, res: express.Response) => {
            let result = {};
            const stop = req.query.stop;
            if(stop){
                const settings = {
                    start: String(stop),
                    end: String(stop),
                }
                result = findShortestRoundTripRoute(Route, Route.getStop(settings.start), 0, settings, 0, Infinity, true, 0, []);
            } else {
                result = { error: true, message: 'Missing required params'}
            }
            res.json({
                result,
            })
        });

        router.get('/findShortRoundTrips', cors(), (req: express.Request, res: express.Response) => {
            let result = {};
            const { maxStops, maxDistance, target } = req.query;
            if(maxStops && maxDistance && target){
                
                const settings = {
                    maxStops: Number(maxStops),
                    maxDistance: Number(maxDistance),
                    target: String(target),
                    condition: (arr: any, settings: any) => arr.length <= settings.maxStops + 1
                }

                result = findShortRoundTrips(Route, settings, shortRoundTripRoutes);

            } else {
                result = { error: true, message: 'Missing required params'}
            }
            res.json({
                result,
            })
        });

        router.get('/findSpecificRoute', cors(), (req: express.Request, res: express.Response) => {
            let result = {};
            const { exactly, end, maxStops, start } = req.query;

            if(exactly && start && end && maxStops){

                const settings = {
                    exactly: Number(exactly),
                    start: String(start),
                    end: String(end),
                    maxStops: Number(maxStops)
                }

                result = findSpecificRoute(Route, settings);

            } else {
                result = { error: true, message: 'Missing required params'}
            }
            res.json({
                result,
            })
        });

        server.use('/', router)
    }
}

export default Router;