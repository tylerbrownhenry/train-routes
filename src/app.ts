import findShortestRoundTripRoute from './services/findShortestRoundTripRoute';
import generateRoutes from './services/generateRoutes';
import perparedDistanceRequest from './services/perparedDistanceRequest';
import defaultRoutes from './data/defaultRoutes';
import shortRoundTripRoutes from './data/shortRoundTripRoutes';
import shortRoundTripSettings from './settings/shortRoundTripSettings';
import specificTripSettings from './settings/specificTripSettings';
import shortestRouteTripSettings from './settings/shortestRouteTripSettings';
import shortestRouteRoundTripSettings from './settings/shortestRouteRoundTripSettings';
import pathUnderAmountSettings from './settings/pathUnderAmountSettings';
import findSpecificRoute from './services/findSpecificRoute';
import findShortestRoute from './services/findShortestRoute';
import findShortRoundTrips from './services/findShortRoundTrips';

const app = () => {
    const Routes = generateRoutes();
    const responses = perparedDistanceRequest(Routes, defaultRoutes);
    responses.push(findShortRoundTrips(Routes, shortRoundTripSettings, shortRoundTripRoutes));
    responses.push(findSpecificRoute(Routes, specificTripSettings));
    responses.push(
        findShortestRoute(
            Routes,
            Routes.getStop(shortestRouteTripSettings.start),
            0,
            shortestRouteTripSettings,
            0,
            Infinity,
        ),
    );
    responses.push(
        findShortestRoundTripRoute(
            Routes,
            Routes.getStop(shortestRouteRoundTripSettings.start),
            0,
            shortestRouteRoundTripSettings,
            0,
            Infinity,
            true,
            0,
            [],
        ),
    );
    responses.push(findShortRoundTrips(Routes, pathUnderAmountSettings, shortRoundTripRoutes));

    if (responses.length > 0) {
        responses.forEach((response: string, i: number) => {
            console.log(`OUTPUT #${i + 1}: ` + response);
        });
    }
};

export default app;
