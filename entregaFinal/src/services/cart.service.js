import CartRepository from '../repositories/cart.repository.js';
import ProductRepository from '../repositories/product.repository.js';
import UserRepository from '../repositories/user.repository.js';
import TicketService from './ticket.service.js';

class CartService {
    async getCartById(id) {
        try {
            const cart = await CartRepository.getCartById(id);
            if (!cart) {
                throw new Error('cart not found with that id');
            }
            return cart;
        } catch (error) {
            throw new Error(`Error to get cart: ${error.message}`);
        }
    }

    async getCartPurchase(id) {
        try {
            const cart = await CartRepository.getCartById(id);
            const arrayProducts = cart.products;

            const outProducts = [];

            for (const item of arrayProducts) {
                const productId = item.product;
                const product = await ProductRepository.getProductById(productId);

                if (product.stock >= item.quantity) {
                    product.stock -= item.quantity;
                    await product.save();
                }
                else {
                    outProducts.push(productId);
                }
            }

            const cartUser = await UserRepository.getUserByCartId(id);

            const ticket = await TicketService.addTicket(cartUser, cart.products);

            cart.products = cart.products.filter(item => outProducts.some(productId => productId.equals(item.product)));

            await CartRepository.saveCart(cart);

            return { outProducts, ticket };
        }
        catch (error) {
            throw new Error(`Error to get cart: ${error.message}`);
        }
    }

    async addCart() {
        try {
            return await CartRepository.addCart();
        } catch (error) {
            throw new Error(`Error to add cart, ${error.message}`);
        }
    }

    async addCartProduct(cid, pid, quantity = 1) {
        try {
            const cart = await this.getCartById(cid);
            const productExists = cart.products.find(product => product.product._id.toString() === pid);
            if (productExists) {
                productExists.quantity += quantity;
            } else {
                cart.products.push({ product: pid, quantity });
            }
            return await CartRepository.saveCart(cart);
        } catch (error) {
            throw new Error(`Error to add product to cart, ${error.message}`);
        }
    }

    async updateCart(id, newData) {
        try {
            const arrayCarts = await CartRepository.updateCart(id, newData);
            if (!arrayCarts) {
                throw new Error('cart not found with that id');
            }
            return arrayCarts;
        }
        catch (error) {
            throw new Error(`Error to update cart: ${error.message}`);
        }
    }

    async updateCartProduct(cid, pid, quantity = 1) {
        try {
            const cart = await this.getCartById(cid);
            const productExists = cart.products.find(product => product.product._id.toString() === pid);
            if (productExists) {
                productExists.quantity += quantity;
            }
            else {
                throw new Error('Not found product id in cart');
            }
            return await CartRepository.saveCart(cart);
        } catch (error) {
            throw new Error(`Error to update product to cart, ${error.message}`);
        }
    }

    async deleteCart(id) {
        try {
            const arrayCarts = await CartRepository.deleteCart(id);
            if (!arrayCarts) {
                throw new Error('cart not found with that id');
            }
            return arrayCarts;
        }
        catch (error) {
            throw new Error(`Error to delete cart: ${error.message}`);
        }
    }

    async deleteCartProduct(cid, pid) {
        try {
            const cart = await this.getCartById(cid);
            cart.products = cart.products.filter(product => product.product._id.toString() !== pid);
            return await CartRepository.saveCart(cart);
        } catch (error) {
            throw new Error(`Error to delete product to cart, ${error.message}`);
        }
    }
}

export default new CartService();