declare const pathUnderAmountSettings: {
    maxStops: number;
    maxDistance: number;
    target: string;
    condition: (arr: any, settings: any) => boolean;
};
export default pathUnderAmountSettings;
