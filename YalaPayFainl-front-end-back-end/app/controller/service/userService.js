import userRepo from "../../models/repository/userRepo.js";


const yalaPayRepo1= userRepo

export default class UserService {
    async getUser(req, res) {
        try {
            let user;
            if (req.params.email,req.params.password)
                 user = await yalaPayRepo1.getUser(req.params.email,req.params.password)
            else
                user = await yalaPayRepo1.getUsers()
            res.json(user)
        } catch (e) {
            res.send(e)
        }
    }
    async addUser(req, res) {
        try {
            const response = await yalaPayRepo1.addUser(req.body)
            res.send(response)
        } catch (e) {
            res.send(e)
        }
    }


}