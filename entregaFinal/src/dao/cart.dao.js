import CartModel from './models/cart.model.js';

class CartDao {
    async findById(id) {
        return await CartModel.findById(id);
    }

    async add() {
        const newCart = new CartModel({products: []});
        return await newCart.save();
    }

    async save(cart) {
        cart.markModified('products');
        return await cart.save();
    }

    async update(id, newData) {
        return await CartModel.findByIdAndUpdate(id, newData);
    }

    async delete(id) {
        return await CartModel.findByIdAndDelete(id);
    }
}

export default new CartDao();