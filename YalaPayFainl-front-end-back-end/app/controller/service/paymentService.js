
import paymentRepo from "../../models/repository/paymentRepo.js";


const yalaPayRepo1=paymentRepo

export default class paymentService {

//payment

    async getPayments(req, res) {
        try {
            let payment;
            if (req.params.paymentId)
                payment = await yalaPayRepo1.getPayment(req.params.paymentId)
            else
                payment = await yalaPayRepo1.getPayments()
            res.json(payment)
        } catch (e) {
            res.send(e)
        }
    }
     async getInvoicePayment(req, res) {
        try {
            let payment;
            payment = await yalaPayRepo1.getInvoicePayment(req.params.invoiceNo)
            res.json(payment)
        } catch (e) {
            console.log(e)
            res.send(e)
        }
    }
    async updatePayment(req, res) {
        try {
            const response = await yalaPayRepo1.updatePayment(req.body)
            res.json(response)
        } catch (e) {
            console.log(e)
            res.status(500).send(e)
        }
    }
    async addPayment(req, res) {
        try {
            const response = await yalaPayRepo1.addPayment(req.body)
            res.send(response)
        } catch (e) {
            console.log(e)
            res.send(e)
        }
    }
    async deletePayment(req, res) {
        try {
            const response = await yalaPayRepo1.deletePayment(req.params.paymentId)
            res.send(response)
        } catch (e) {
            res.send(e)
        }
    }


}