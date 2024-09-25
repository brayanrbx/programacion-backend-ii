import userModel from "./models/user.model";

class UserDao {
    async findById(id) {
        return await userModel.findById(id);
    }

    async findOne(query) {
        return await userModel.findOne(query);
    }

    async save(userData) {
        return await user.save(userData);
    }
}

export default new UserDao();