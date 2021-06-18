"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pathUnderAmountSettings = {
    maxStops: Infinity,
    maxDistance: 30,
    target: 'C',
    condition: (arr, settings) => arr.length <= settings.maxDistance
};
exports.default = pathUnderAmountSettings;
//# sourceMappingURL=pathUnderAmountSettings.js.map