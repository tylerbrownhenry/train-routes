import findRoute from './findRoute';

const findShortRoundTrips = (Routes: any, settings: any, inputData: any) => {
  return inputData.reduce((accumulator: any, route: string) => {
    const routeArr = route.split('');
    if (settings.condition(routeArr, settings)) {
      const start = routeArr[0];
      const end = routeArr[routeArr.length - 1];
      if (start === settings.target && end === settings.target) {
        const distance = findRoute(
          Routes,
          routeArr.shift(),
          routeArr.shift(),
          routeArr,
          0
        );
        if (distance <= settings.maxDistance) {
          accumulator++;
        }
      }
    }
    return accumulator;
  }, 0);
};

export default findShortRoundTrips;
