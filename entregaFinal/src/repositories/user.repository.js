import userDao from "../dao/user.dao";

class UserRepository {
    async createUser(userData) {
        return await userDao.save(userData);
    }

    async getUserById(id) {
        return await userDao.findById(id);
    }

    async getUsersByEmail(email) {
        return await userDao.findOne({ email });
    }
}

export default new UserRepository();