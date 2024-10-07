import { Router } from 'express';
import ProductController from '../controllers/product.controller.js';

const routeProducts = Router();

routeProducts.get('/', ProductController.getAll);

routeProducts.get('/:pid', ProductController.getById);

routeProducts.post('/', ProductController.add);

routeProducts.put('/:pid', ProductController.update);

routeProducts.delete('/:pid', ProductController.delete);

export default routeProducts;

