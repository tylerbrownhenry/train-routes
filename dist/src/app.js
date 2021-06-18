"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const findShortestRoundTripRoute_1 = __importDefault(require("./services/findShortestRoundTripRoute"));
const generateRoutes_1 = __importDefault(require("./services/generateRoutes"));
const perparedDistanceRequest_1 = __importDefault(require("./services/perparedDistanceRequest"));
const defaultRoutes_1 = __importDefault(require("./data/defaultRoutes"));
const shortRoundTripRoutes_1 = __importDefault(require("./data/shortRoundTripRoutes"));
const shortRoundTripSettings_1 = __importDefault(require("./settings/shortRoundTripSettings"));
const specificTripSettings_1 = __importDefault(require("./settings/specificTripSettings"));
const shortestRouteTripSettings_1 = __importDefault(require("./settings/shortestRouteTripSettings"));
const shortestRouteRoundTripSettings_1 = __importDefault(require("./settings/shortestRouteRoundTripSettings"));
const pathUnderAmountSettings_1 = __importDefault(require("./settings/pathUnderAmountSettings"));
const findSpecificRoute_1 = __importDefault(require("./services/findSpecificRoute"));
const findShortestRoute_1 = __importDefault(require("./services/findShortestRoute"));
const findShortRoundTrips_1 = __importDefault(require("./services/findShortRoundTrips"));
const app = () => {
    const Routes = generateRoutes_1.default();
    const responses = perparedDistanceRequest_1.default(Routes, defaultRoutes_1.default);
    responses.push(findShortRoundTrips_1.default(Routes, shortRoundTripSettings_1.default, shortRoundTripRoutes_1.default));
    responses.push(findSpecificRoute_1.default(Routes, specificTripSettings_1.default));
    responses.push(findShortestRoute_1.default(Routes, Routes.getStop(shortestRouteTripSettings_1.default.start), 0, shortestRouteTripSettings_1.default, 0, Infinity));
    responses.push(findShortestRoundTripRoute_1.default(Routes, Routes.getStop(shortestRouteRoundTripSettings_1.default.start), 0, shortestRouteRoundTripSettings_1.default, 0, Infinity, true, 0, []));
    responses.push(findShortRoundTrips_1.default(Routes, pathUnderAmountSettings_1.default, shortRoundTripRoutes_1.default));
    if (responses.length > 0) {
        responses.forEach((response, i) => {
            console.log(`OUTPUT #${i + 1}: ` + response);
        });
    }
};
exports.default = app;
//# sourceMappingURL=app.js.map