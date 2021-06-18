const shortRoundTripSettings = {
    maxStops: 3,
    maxDistance: 30,
    target: 'C',
    condition: (arr: any, settings: any) => arr.length <= settings.maxStops + 1
};

export default shortRoundTripSettings;