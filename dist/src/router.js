"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const cors_1 = __importDefault(require("cors"));
const generateRoutes_1 = __importDefault(require("./services/generateRoutes"));
const findShortestRoundTripRoute_1 = __importDefault(require("./services/findShortestRoundTripRoute"));
const findShortRoundTrips_1 = __importDefault(require("./services/findShortRoundTrips"));
const shortRoundTripRoutes_1 = __importDefault(require("./data/shortRoundTripRoutes"));
const findSpecificRoute_1 = __importDefault(require("./services/findSpecificRoute"));
const findShortestRoute_1 = __importDefault(require("./services/findShortestRoute"));
const perparedDistanceRequest_1 = __importDefault(require("./services/perparedDistanceRequest"));
const Route = generateRoutes_1.default();
const app_1 = __importDefault(require("./app"));
app_1.default();
const findRoutes = (routes) => {
    if (routes && typeof routes === 'string') {
        console.log('tes22t', routes);
        try {
            return generateRoutes_1.default(JSON.parse(routes.replace('List', '')));
        }
        catch (e) {
            return;
        }
    }
    else {
        return generateRoutes_1.default(routes);
    }
};
class Router {
    constructor(server) {
        const router = express.Router();
        router.get('/', (req, res) => {
            res.json({
                message: `try http://localhost:3000/swagger/#/default/get_findShortestRoundTripRoute`,
            });
        });
        router.get('/findShortestRoundTripRoute', cors_1.default(), (req, res) => {
            let result = {};
            let { stop, routes } = req.query;
            if (stop) {
                const settings = {
                    start: String(stop),
                    end: String(stop),
                };
                let route = findRoutes(routes);
                if (route) {
                    result = findShortestRoundTripRoute_1.default(route, route.getStop(settings.start), 0, settings, 0, Infinity, true, 0, []);
                }
                else {
                    result = { error: true, message: 'Invalid routes provided' };
                }
            }
            else {
                result = { error: true, message: 'Missing required params' };
            }
            res.json({
                result,
            });
        });
        router.get('/findShortRoundTrips', cors_1.default(), (req, res) => {
            let result = {};
            let { maxStops, maxDistance, target, routes, trips, checkKey } = req.query;
            if (target && checkKey) {
                const settings = {
                    trips,
                    maxStops: maxStops ? Number(maxStops) : Infinity,
                    maxDistance: maxDistance ? Number(maxDistance) : Infinity,
                    target: String(target),
                    checkKey: String(checkKey),
                    condition: (arr, settings) => arr.length <= settings[settings.checkKey] + 1,
                };
                try {
                    if (typeof trips === 'string') {
                        trips = JSON.parse(trips.replace('List', ''));
                    }
                    else {
                        trips = shortRoundTripRoutes_1.default;
                    }
                }
                catch (e) {
                    trips = shortRoundTripRoutes_1.default;
                }
                let route = findRoutes(routes);
                if (route) {
                    result = findShortRoundTrips_1.default(route, settings, trips);
                }
                else {
                    result = { error: true, message: 'Invalid routes provided' };
                }
            }
            else {
                result = { error: true, message: 'Missing required params' };
            }
            res.json({
                result,
            });
        });
        router.get('/findShortestRoute', cors_1.default(), (req, res) => {
            let result = {};
            let { end, start, routes } = req.query;
            if (start && end) {
                const settings = {
                    start: String(start),
                    end: String(end),
                };
                let route = findRoutes(routes);
                if (route) {
                    result = findShortestRoute_1.default(route, route.getStop(settings.start), 0, settings, 0, Infinity);
                }
                else {
                    result = { error: true, message: 'Invalid routes provided' };
                }
            }
            else {
                result = { error: true, message: 'Missing required params' };
            }
            res.json({
                result,
            });
        });
        router.get('/findTripDistance', cors_1.default(), (req, res) => {
            let result = {};
            let { trip, routes } = req.query;
            if (trip) {
                const settings = {
                    trip: String(trip),
                };
                let route = findRoutes(routes);
                if (route) {
                    result = perparedDistanceRequest_1.default(route, [trip]);
                }
                else {
                    result = { error: true, message: 'Invalid routes provided' };
                }
            }
            else {
                result = { error: true, message: 'Missing required params' };
            }
            res.json({
                result,
            });
        });
        router.get('/findSpecificRoute', cors_1.default(), (req, res) => {
            let result = {};
            let { end, exactStops, start, routes } = req.query;
            if (start && end && exactStops) {
                const settings = {
                    start: String(start),
                    end: String(end),
                    maxStops: Number(exactStops),
                };
                let route = findRoutes(routes);
                if (route) {
                    result = findSpecificRoute_1.default(route, settings);
                }
                else {
                    result = { error: true, message: 'Invalid routes provided' };
                }
            }
            else {
                result = { error: true, message: 'Missing required params' };
            }
            res.json({
                result,
            });
        });
        server.use('/', router);
    }
}
exports.default = Router;
//# sourceMappingURL=router.js.map