
import bankRepo from "../../models/repository/bankRepo.js";


const yalaPayRepo1= bankRepo

export default class bankService {
    async getBanks(req, res) {
        try {

            const bank = await yalaPayRepo1.getBanks()
            res.json(bank)
        } catch (e) {
            res.send(e)
        }
    }
    async addBank(req, res) {
        try {
            const response = await yalaPayRepo1.addBank(req.body)
            res.send(response)
        } catch (e) {
            res.send(e)
        }
    }
    /////////////////
 async getBankAccounts(req, res) {
        try {
            const cheque = await yalaPayRepo1.getBankAccounts()
            res.json(cheque)
        } catch (e) {
            res.send(e)
        }
    }
    async addBankAccounts(req, res) {
        try {
            const response = await yalaPayRepo1.addBankAccounts(req.body)
            res.send(response)
        } catch (e) {
            res.send(e)
        }
    }


}