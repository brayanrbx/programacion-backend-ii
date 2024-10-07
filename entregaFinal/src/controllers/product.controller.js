import ProductService from "../services/product.service.js";

class ProductController {
    async getAll(req, res, next) {
        const { limit = 10, page = 1, sort, query } = req.query;
        try {
            const products = await ProductService.getAllProducts({
                limit: parseInt(limit),
                page: parseInt(page),
                sort,
                query,
            });

            res.status(200).json({
                status: 'success',
                payload: products.docs,
                totalPages: products.totalPages,
                prevPage: products.prevPage,
                nextPage: products.nextPage,
                page: products.page,
                hasPrevPage: products.hasPrevPage,
                hasNextPage: products.hasNextPage,
                prevLink: products.hasPrevPage ? `/api/products?limit=${limit}&page=${products.prevPage}&sort=${sort}&query=${query}` : null,
                nextLink: products.hasNextPage ? `/api/products?limit=${limit}&page=${products.nextPage}&sort=${sort}&query=${query}` : null,
            });
        }
        catch(error) {
            error.status = 500;
            next(error);
        }
    }

    async getById(req, res, next) {
        const { pid } = req.params;
        try {
            const product = await ProductService.getProductById(pid);
            res.status(200).json({
                msg: product
            })
        }
        catch(error) {
            error.status = 500;
            next(error);
        }
    }

    async add(req, res, next) {
        const { body } = req;
        try {
            const product = await ProductService.addProduct(body)
            res.status(201).json({
                msg: 'Product added successfully',
                product
            });
        }
        catch(error) {
            error.status = 500;
            next(error);
        }
    }

    async update(req, res, next) {
        const { pid } = req.params;
        const { body } = req;
        try {
            const product = await ProductService.updateProduct(pid, body)
            res.status(201).json({
                msg: 'Product updated successfully',
                product
            });
        }
        catch(error) {
            error.status = 500;
            next(error);
        }
    }

    async delete(req, res, next) {
        const { pid } = req.params;
        try {
            await ProductService.deleteProduct(pid)
            res.status(200).json({
                msg: 'Product deleted successful'
            });
        }
        catch(error) {
            error.status = 500;
            next(error);
        }
    }
}

export default new ProductController();

