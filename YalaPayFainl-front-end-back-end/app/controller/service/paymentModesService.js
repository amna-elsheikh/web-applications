
import paymentModesRepo from "../../models/repository/paymentModesRepo.js";


const yalaPayRepo1= paymentModesRepo

export default class paymentModesService {
    async getpaymentModes(req, res) {
        try {

            const bank = await yalaPayRepo1.getPaymentMode()
            res.json(bank)
        } catch (e) {
            res.send(e)
        }
    }
    async addpaymentModes(req, res) {
        try {
            const response = await yalaPayRepo1.addpaymentMode(req.body)
            res.send(response)
        } catch (e) {
            res.send(e)
        }
    }

}