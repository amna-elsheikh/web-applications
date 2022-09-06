
import User from "../model/user.js";
import fs from "fs-extra";
const userJsonFile="data/users.json";

 class userRepo {
    constructor() {
    }
    async initUsers() {
        const count= await this.getUsersCount()
        if (count===0){
            const users = await fs.readJson(userJsonFile);
            for (const user of users) {
                await this.addUser(user);
            }
        }
    }
    getUsersCount() {
        return User.countDocuments({});
    }
    async getUsers() {
        return User.find().lean()

    }
    async addUser(user) {
        return User.create(user)
    }
    async getUser(email,password) {
        return User.findOne({email,password}).lean()
    }

}
export default new userRepo();