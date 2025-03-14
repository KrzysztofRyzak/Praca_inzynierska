import bcrypt from "bcryptjs";
import { User } from "../models/schemas.js";

export class UsersController {
    async getAll() {
        return await User.findAll({});
    }

    async getAllUsersByRole(role) {
        return await User.findAll({
            where: {
                role
            }
        });
    }

    async createUser(userData) {
        const salt = await bcrypt.genSalt(10);
        userData.password = await bcrypt.hash(userData.password, salt);

        const userDb = await User.create(userData);
        return userDb;
    }

    async validPassword(password, userDb) {
        try {
            return await bcrypt.compare(password, userDb.password);
        } catch (err) {
            throw new Error(err);
        }
    }

    async getById(id) {
        return await User.findByPk(id);
    }

    async updateById(id, userData) {
        const updatedUser = await User.update(userData, {
            where: {
                id
            }
        });

        return updatedUser;
    }

    async getUserByEmail(email) {
        return await User.findOne({
            where: {
                email
            }
        });
    }

    async deleteById(id) {
        return await User.destroy({
            where: {
                id
            }
        });
    }
}
