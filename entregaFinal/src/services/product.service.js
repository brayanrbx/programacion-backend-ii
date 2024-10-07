import ProductRepository from '../repositories/product.repository.js';
class ProductService {
    async getAllProducts({ limit = 10, page = 1, sort, query } = {}) {
        try {
            const skip = (page - 1) * limit;

            let queryOptions = {};

            if (query) {
                queryOptions = { category: query };
            }

            const sortOptions = {};
            if (sort) {
                if (sort === 'asc' || sort === 'desc') {
                    sortOptions.price = sort === 'asc' ? 1 : -1;
                }
            }

            const { products, totalProducts } = await ProductRepository.getAllProducts(queryOptions, sortOptions, skip, limit);

            const totalPages = Math.ceil(totalProducts / limit);
            const hasPrevPage = page > 1;
            const hasNextPage = page < totalPages;

            return {
                docs: products,
                totalPages,
                prevPage: hasPrevPage ? page - 1 : null,
                nextPage: hasNextPage ? page + 1 : null,
                page,
                hasPrevPage,
                hasNextPage,
                prevLink: hasPrevPage ? `/api/products?limit=${limit}&page=${page - 1}&sort=${sort}&query=${query}` : null,
                nextLink: hasNextPage ? `/api/products?limit=${limit}&page=${page + 1}&sort=${sort}&query=${query}` : null,
            };

        } catch (error) {
            throw new Error(`Error to get products, ${error.message}`);
        }
    }

    async getProductById(id) {
        try {
            const arrayProduct = await ProductRepository.getProductById(id);

            if (!arrayProduct) {
                throw new Error('Product not found');
            }
            return arrayProduct;
        }
        catch(error) {
            throw new Error(`Error to get product, ${error.message}`);
        }
    }

    async addProduct(product) {
        try {
            const { code } = product;

            const productExists = await ProductRepository.getProductByCode(code);

            if (productExists) {
                throw new Error('Code must be unique');
            }

            return await ProductRepository.addProduct(product);
        }
        catch(error) {
            throw new Error(`Error to add product, ${error.message}`);
        }
    }

    async updateProduct (id, newData) {
        try {
            const product = await ProductRepository.updateProduct(id, newData);

            if (!product) {
                throw new Error('Product not found');
            }

            return product;
        } catch (error) {
            throw new Error(`Error to update product: ${error.message}`);
        }
    }
    async deleteProduct(id) {
        try {
            const deletedProduct = await ProductRepository.deleteProduct(id);

            if (!deletedProduct) {
                throw new Error('Product not found');
            }

        } catch (error) {
            throw new Error(`Error to delete product, ${error.message}`);
        }
    }
}

export default new ProductService();