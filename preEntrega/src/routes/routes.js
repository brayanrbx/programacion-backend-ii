import { Router } from 'express';
import routeProducts from './products.router.js';
import routeCarts from './carts.router.js';
import routeSession from './session.router.js';

const routeMain = Router();

routeMain.use('/products', routeProducts);
routeMain.use('/carts', routeCarts);
routeMain.use('/sessions', routeSession);

export default routeMain;