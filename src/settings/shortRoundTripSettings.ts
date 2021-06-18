const shortRoundTripSettings = {
    maxStops: 3,
    maxDistance: Infinity,
    target: 'C',
    condition: (arr: any, settings: any) => arr.length <= settings.maxStops + 1,
};

export default shortRoundTripSettings;
