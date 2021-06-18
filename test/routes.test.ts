import { strict as assert } from 'assert';

import findShortestRoundTripRoute from '../src/services/findShortestRoundTripRoute';
import generateRoutes from '../src/services/generateRoutes';
import perparedDistanceRequest from '../src/services/perparedDistanceRequest';
import defaultRoutes from '../src/data/defaultRoutes';
import shortRoundTripRoutes from '../src/data/shortRoundTripRoutes';
import shortRoundTripSettings from '../src/settings/shortRoundTripSettings';
import specificTripSettings from '../src/settings/specificTripSettings';
import shortestRouteTripSettings from '../src/settings/shortestRouteTripSettings';
import shortestRouteRoundTripSettings from '../src/settings/shortestRouteRoundTripSettings';
import pathUnderAmountSettings from '../src/settings/pathUnderAmountSettings';
import findSpecificRoute from '../src/services/findSpecificRoute';
import findShortestRoute from '../src/services/findShortestRoute';
import findShortRoundTrips from '../src/services/findShortRoundTrips';


describe("check routing functions", () => {
    it("perparedDistanceRequest", () => {
        const Routes = generateRoutes();
        const result = perparedDistanceRequest(Routes, defaultRoutes);
        assert.deepStrictEqual(result, [ 9, 5, 13, 22, 'NO SUCH ROUTE' ]);
    });
});

describe("check routing functions", () => {
    it("findShortRoundTrips", () => {
        const Routes = generateRoutes();
        const result = findShortRoundTrips(Routes, shortRoundTripSettings, shortRoundTripRoutes);
        assert.equal(result, 2);
    });
});

describe("check routing functions", () => {
    it("findShortRoundTrips 2", () => {
        const Routes = generateRoutes();
        const result = findShortRoundTrips(Routes, pathUnderAmountSettings, shortRoundTripRoutes);
        assert.equal(result, 7);
    });
});

describe("check routing functions", () => {
    it("findShortestRoundTripRoute", () => {
        const Routes = generateRoutes();
        const result = findShortestRoundTripRoute( Routes, Routes.getStop(shortestRouteRoundTripSettings.start), 0, shortestRouteRoundTripSettings, 0, Infinity, true, 0,[])
        assert.equal(result, 9);
    });
});

describe("check routing functions", () => {
    it("findShortestRoute", () => {
        const Routes = generateRoutes();
        const result = findShortestRoute( Routes, Routes.getStop(shortestRouteTripSettings.start), 0, shortestRouteTripSettings, 0, Infinity);
        assert.equal(result, 9);
    });
});

describe("check routing functions", () => {
    it("findSpecificRoute", () => {
        const Routes = generateRoutes();
        const result = findSpecificRoute(Routes, specificTripSettings);
        assert.equal(result, 3);
    });
});