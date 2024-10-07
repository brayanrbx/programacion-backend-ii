import UserModel from './models/user.model.js';

class UserDao {
    async findById(id) {
        return await UserModel.findById(id);
    }

    async findOne(query) {
        return await UserModel.findOne(query);
    }

    async save(userData) {
        return await UserModel.create(userData);
    }
}

export default new UserDao();