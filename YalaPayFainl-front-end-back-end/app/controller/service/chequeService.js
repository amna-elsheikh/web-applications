
import chequeRepo from "../../models/repository/chequeRepo.js";


const yalaPayRepo1= chequeRepo

export default class chequeService {


    async addCheque(req, res) {
        try {
            const response = await yalaPayRepo1.addCheque(req.body)
            res.send(response)
        } catch (e) {
            res.send(e)
        }
    }
    async getChequesSum(req, res) {
        try {
            let cheque = await yalaPayRepo1.getChequesSum(req.params.status)

            res.json(cheque)
        } catch (e) {
            res.send(e)
        }
    }
    async getTotalChequesSum(req, res) {
        try {
            let cheque = await yalaPayRepo1.getTotalChequesSum()

            res.json(cheque)
        } catch (e) {
            console.log(e)
            res.send(e)
        }
    }
    async getChequesDate(req, res) {
        try {

            let cheque = await yalaPayRepo1.getChequesDate(req.params.status,req.params.toDate,req.params.fromDate)

            res.json(cheque)
        } catch (e) {
            console.log(e)
            res.send(e)
        }
    }   async getChequesDateAll(req, res) {
        try {
            let cheque = await yalaPayRepo1.getChequesDateAll(req.params.toDate,req.params.fromDate)

            res.json(cheque)
        } catch (e) {
            console.log(e)
            res.send(e)
        }
    }
    async getCheques(req, res) {
        try {
            let cheque;
            if (req.params.ChequeNo)
                cheque = await yalaPayRepo1.getCheque(req.params.ChequeNo)
            else
                cheque = await yalaPayRepo1.getCheques()
            res.json(cheque)
        } catch (e) {
            res.send(e)
        }
    }

    async updateCheque(req, res) {
        try {
            const response = await yalaPayRepo1.updateCheque(req.body)
            res.json(response)
        } catch (e) {
            console.log(e)
            res.status(500).send(e)
        }
    }
    async  deleteCheque(req, res) {
        try {
            const response = await yalaPayRepo1.deleteCheque(req.params.ChequeNo)
            res.send(response)
        } catch (e) {
            res.send(e)
        }
    }

}