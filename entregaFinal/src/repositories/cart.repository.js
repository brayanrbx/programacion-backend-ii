import CartDao from '../dao/cart.dao.js';

class CartRepository {
    async getCartById(id) {
        return await CartDao.findById(id);
    }

    async addCart() {
        return await CartDao.add();
    }

    async saveCart(cart) {
        return await CartDao.save(cart);
    }

    async updateCart(id, newData) {
        return await CartDao.update(id, newData);
    }

    async deleteCart(id) {
        return await CartDao.delete(id);
    }
}

export default new CartRepository();