import ProductModel from './models/products.model.js';

class ProductDao {

    async getAll(queryOptions, sortOptions, skip, limit) {
        const products = await ProductModel
                .find(queryOptions)
                .sort(sortOptions)
                .skip(skip)
                .limit(limit);

        const totalProducts = await ProductModel.countDocuments(queryOptions);

        return {
            products,
            totalProducts
        };
    }
    async findById(id) {
        return await ProductModel.findById(id);
    }

    async findOne(query) {
        return await ProductModel.findOne(query);
    }

    async save(product) {
        return await ProductModel.create(product);
    }

    async findByIdAndUpdate(id, newData) {
        return await ProductModel.findByIdAndUpdate(id, newData);
    }

    async findByIdAndDelete(id) {
        return await ProductModel.findByIdAndDelete(id);
    }
}

export default new ProductDao();