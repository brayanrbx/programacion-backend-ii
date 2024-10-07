import UserRepository from '../repositories/user.repository.js';
import { createHash, isValidPassword } from '../utils.js/util.js';
import CartService from "../services/cart.service.js";

class UserService {
    async registerUser(userData) {

        const existsUser = await UserRepository.getUserByEmail(userData.email);

        if (existsUser) {
            throw new Error('User already exists');
        }

        const newCart = await CartService.addCart();

        userData.cartId = newCart._id
        userData.password = createHash(userData.password);

        return await UserRepository.createUser(userData);
    }

    async loginUser(email, password) {
        const user = await UserRepository.getUserByEmail(email);
        if (!user || !isValidPassword(password, user)) {
            throw new Error('Invalid user or password');
        }
        return user;
    }
}

export default new UserService();