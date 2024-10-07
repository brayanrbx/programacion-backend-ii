import ProductDao from '../dao/product.dao.js';

class ProductRepository {
    async getAllProducts(queryOptions, sortOptions, skip, limit) {
        return await ProductDao.getAll(queryOptions, sortOptions, skip, limit);
    }

    async getProductById(id) {
        return await ProductDao.findById(id);
    }

    async getProductByCode(code) {
        return await ProductDao.findOne({ code });
    }

    async addProduct(product) {
        return await ProductDao.save(product);
    }

    async updateProduct(id, newData) {
        return await ProductDao.findByIdAndUpdate(id, newData);
    }

    async deleteProduct(id) {
        return await ProductDao.findByIdAndDelete(id);
    }
}

export default new ProductRepository();