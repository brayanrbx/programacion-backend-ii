import CartService from "../services/cart.service.js";

class CartController {
    async getById(req, res, next) {
        const { cid } = req.params;
        try {
            const cart = await CartService.getCartById(cid);
            res.status(200).json({
                msg: cart
            })
        }
        catch(error) {
            error.status = 500;
            next(error);
        }
    }

    async getCartPurchase(req, res, next) {
        const cartId = req.params.cid;
        try {
            const { outProducts, ticket } = await CartService.getCartPurchase(cartId);
            res.status(200).json({
                msg: 'Purchase successful',
                ticket: {
                    id: ticket._id,
                    amount: ticket.amount,
                    purchaser: ticket.purchaser
                },
                outProducts
            })
        }
        catch(error) {
            error.status = 500;
            next(error);
        }
    }

    async add(req, res, next) {
        try {
            const cart = await CartService.addCart();
            res.status(201).json({
                msg: 'Cart added successfully',
                cart
            });
        }
        catch(error) {
            error.status = 500;
            next(error);
        }
    }

    async addCartProduct(req, res, next) {
        const { cid, pid } = req.params;
        const quantity = req.body.quantity || 1;
        try {
            const cart = await CartService.addCartProduct(cid, pid, quantity)
            res.status(201).json({
                msg: 'Cart added successfully',
                cart
            });
        }
        catch(error) {
            error.status = 500;
            next(error);
        }
    }

    async update(req, res, next) {
        const { cid } = req.params;
        const { body } = req
        try {
            const cart = await CartService.updateCart(cid, body);
            res.status(200).json({
                msg: cart
            })
        }
        catch(error) {
            error.status = 500;
            next(error);
        }
    }

    async updateCartProduct(req, res, next) {
        const { cid, pid } = req.params;
        const quantity = req.body.quantity || 1;
        try {
            const cart = await CartService.updateCartProduct(cid, pid, quantity)
            res.status(201).json({
                msg: 'Cart updated successfully',
                cart
            });
        }
        catch(error) {
            error.status = 500;
            next(error);
        }
    }

    async delete(req, res, next) {
        const { cid } = req.params;
        try {
            await CartService.deleteCart(cid)
            res.status(200).json({
                msg: 'Cart deleted successful'
            });
        }
        catch(error) {
            error.status = 400;
            next(error);
        }
    }

    async deleteCartProduct(req, res, next) {
        const { cid, pid } = req.params;
        try {
            const cart = await CartService.deleteCartProduct(cid, pid)
            res.status(201).json({
                msg: 'Product cart deleted successfully',
                cart
            });
        }
        catch(error) {
            error.status = 500;
            next(error);
        }
    }
}

export default new CartController();

