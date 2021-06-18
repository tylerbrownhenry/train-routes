import Route from './Route';

class Stop {
  name: string;
  routes: Route[];

  constructor(name: string) {
    this.name = name;
    this.routes = [];
  }

  addRoute(stop: string, distance: number) {
    this.routes.push(new Route(stop, distance));
  }

  getRoute(stop: string) {
    return this.routes.find((routes) => routes.name === stop);
  }

  getRoutes() {
    return this.routes;
  }
}

export default Stop;
