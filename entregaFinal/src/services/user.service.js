import userRepository from "../repositories/user.repository";
import { createHash, isValidPassword } from "../utils.js/util";

class UserService {

    async registerUser(userData) {
        const existsUser = await userRepository.getUsersByEmail(userData.email);

        if (existsUser) {
            throw new Error("User already exists");
        }

        userData.password = createHash(userData.password);
        return await userRepository.createUser(userData);
    }

    async loginUser(email, password) {

    }
}