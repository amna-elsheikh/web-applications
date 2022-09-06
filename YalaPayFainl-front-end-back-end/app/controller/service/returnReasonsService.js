
import returnReasonsRepo from "../../models/repository/returnReasonsRepo.js";

const yalaPayRepo1= returnReasonsRepo

export default class returnReasonsService {
    async getReturnReasonsServices(req, res) {
        try {

            const bank = await yalaPayRepo1.getReturnReason()
            res.json(bank)
        } catch (e) {
            res.send(e)
        }
    }
    async addReturnReasonsService(req, res) {
        try {
            const response = await yalaPayRepo1.addReturnReason(req.body)
            res.send(response)
        } catch (e) {
            res.send(e)
        }
    }

}