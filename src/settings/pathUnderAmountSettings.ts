const pathUnderAmountSettings = {
  maxStops: Infinity,
  maxDistance: 30,
  target: 'C',
  condition: (arr: any, settings: any) => arr.length <= settings.maxDistance
};
export default pathUnderAmountSettings;
