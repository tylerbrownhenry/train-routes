declare const shortRoundTripSettings: {
    maxStops: number;
    maxDistance: number;
    target: string;
    condition: (arr: any, settings: any) => boolean;
};
export default shortRoundTripSettings;
