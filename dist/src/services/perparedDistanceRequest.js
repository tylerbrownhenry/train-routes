"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const findRoute_1 = __importDefault(require("./findRoute"));
const perparedDistanceRequest = (Routes, defaultRoutes) => {
    let output = [];
    defaultRoutes.forEach((routeText) => {
        if (typeof routeText === 'string') {
            const routeArr = routeText.split('');
            let response = findRoute_1.default(Routes, routeArr.shift(), routeArr.shift(), routeArr, 0);
            output.push(response);
        }
        else {
            output.push('INPUT WAS NOT A STRING');
        }
    });
    return output;
};
exports.default = perparedDistanceRequest;
//# sourceMappingURL=perparedDistanceRequest.js.map