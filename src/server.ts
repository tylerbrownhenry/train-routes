import express from 'express';
import Router from './router';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './swagger.json';

const port = parseInt(process.env.PORT || '3000');
const httpServer = express();
new Router(httpServer);
httpServer.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
httpServer.listen(port, () => {
    console.log('also you can view swagger on http://localhost:3000/swagger');
});
