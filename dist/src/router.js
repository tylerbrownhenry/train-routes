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
const Route = generateRoutes_1.default();
const app_1 = __importDefault(require("./app"));
app_1.default();
class Router {
    constructor(server) {
        const router = express.Router();
        router.get('/', (req, res) => {
            res.json({
                message: `try http://localhost:3000/swagger/#/default/get_findShortestRoundTripRoute`
            });
        });
        router.get('/findShortestRoundTripRoute', cors_1.default(), (req, res) => {
            let result = {};
            const stop = req.query.stop;
            if (stop) {
                const settings = {
                    start: String(stop),
                    end: String(stop),
                };
                result = findShortestRoundTripRoute_1.default(Route, Route.getStop(settings.start), 0, settings, 0, Infinity, true, 0, []);
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
            const { maxStops, maxDistance, target } = req.query;
            if (maxStops && maxDistance && target) {
                const settings = {
                    maxStops: Number(maxStops),
                    maxDistance: Number(maxDistance),
                    target: String(target),
                    condition: (arr, settings) => arr.length <= settings.maxStops + 1
                };
                result = findShortRoundTrips_1.default(Route, settings, shortRoundTripRoutes_1.default);
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
            const { exactly, end, maxStops, start } = req.query;
            if (exactly && start && end && maxStops) {
                const settings = {
                    exactly: Number(exactly),
                    start: String(start),
                    end: String(end),
                    maxStops: Number(maxStops)
                };
                result = findSpecificRoute_1.default(Route, settings);
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