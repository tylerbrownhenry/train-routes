import findRoute from './findRoute';

const perparedDistanceRequest = (Routes: any, defaultRoutes: any) => {
    let output: any = [];
    defaultRoutes.forEach((routeText: string) => {
        if (typeof routeText === 'string') {
            const routeArr = routeText.split('');
            let response = findRoute(Routes, routeArr.shift(), routeArr.shift(), routeArr, 0);
            output.push(response);
        } else {
            output.push('INPUT WAS NOT A STRING');
        }
    });
    return output;
};

export default perparedDistanceRequest;
