
import depositRepo from "../../models/repository/depositRepo.js";

const yalaPayRepo1= depositRepo

export default class depositService{
    //deposit

    async getDeposits(req, res) {
        try {
            let deposits;
            if (req.params.depositId)
                deposits = await yalaPayRepo1.getDeposit(req.params.depositId)
            else
                deposits = await yalaPayRepo1.getDeposits()
            res.json(deposits)
        } catch (e) {
            res.send(e)
        }
    }
    async updateDeposit(req, res) {
        try {
            const response = await yalaPayRepo1.updateDeposit(req.body)
            res.json(response)
        } catch (e) {
            console.log(e)
            res.status(500).send(e)
        }
    }
    async addDeposit(req, res) {
        try {
            const response = await yalaPayRepo1.addDeposit(req.body)
            res.send(response)
        } catch (e) {
            console.log(e)
            res.send(e)
        }
    }
    async deleteDeposit(req, res) {
        try {
            const response = await yalaPayRepo1.deleteDeposit(req.params.depositId)
            res.send(response)
        } catch (e) {
            res.send(e)
        }
    }




}