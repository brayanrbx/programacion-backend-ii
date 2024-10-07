import { Router } from 'express';
import CartController from '../controllers/cart.controller.js';

const routeCarts = Router();

routeCarts.get('/:cid', CartController.getById);

routeCarts.get('/:cid/purchase', CartController.getCartPurchase);

routeCarts.post('/', CartController.add);

routeCarts.post('/:cid/products/:pid', CartController.addCartProduct);

routeCarts.put('/:cid', CartController.update);

routeCarts.put('/:cid/products/:pid', CartController.updateCartProduct);

routeCarts.delete('/:cid', CartController.delete);

routeCarts.delete('/:cid/products/:pid', CartController.deleteCartProduct);

export default routeCarts;

