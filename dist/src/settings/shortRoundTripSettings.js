"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shortRoundTripSettings = {
    maxStops: 3,
    maxDistance: Infinity,
    target: 'C',
    condition: (arr, settings) => arr.length <= settings.maxStops + 1,
};
exports.default = shortRoundTripSettings;
//# sourceMappingURL=shortRoundTripSettings.js.map