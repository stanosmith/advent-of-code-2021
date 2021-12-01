// Replace `<VERSION>` with the latest version of Drash v2.x. The latest
// version can be found at https://github.com/drashland/drash/releases/latest
import { Drash } from "./deps.ts"

// Create your resource

class HomeResource extends Drash.Resource {
    public paths = ["/"];

    public GET(request: Drash.Request, response: Drash.Response): void {
        return response.json({
            hello: "world",
            time: new Date(),
        });
    }
}

class DayResource extends Drash.Resource {
    public paths = ["/days"];

    public GET(request: Drash.Request, response: Drash.Response): void {
        return response.json({
            id: "world",
            time: new Date(),
        });
    }
}

// Create and run your server

const server = new Drash.Server({
    hostname: "0.0.0.0",
    port: 1447,
    protocol: "http",
    resources: [
        HomeResource,
        DayResource,
    ],
});

server.run();

console.log(`Server running at ${server.address}.`);