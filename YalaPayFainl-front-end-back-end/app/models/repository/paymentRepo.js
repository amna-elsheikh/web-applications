import fs from 'fs-extra';
import Payment from "../model/payment.js";
import Invoice from "../model/invoice.js";

const paymentJsonFile = "data/payments.json";
import invoiceRepo from "./invoiceRepo.js";
import chequeRepo from "./chequeRepo.js";


class paymentRepo {
    constructor() {
    }

    async initPayments() {
        const count = await this.getPaymentsCount()
        if (count === 0) {
            const Payments = await fs.readJson(paymentJsonFile);
            for (const Payment of Payments) {
                const invoice = await invoiceRepo.getInvoicesbyId(Payment.InvoiceNo)
                Payment.InvoiceID = invoice._id
                if (Payment.PaymentMode === "Cheque") {
                    const Cheque = await chequeRepo.getChequebyId(Payment.ChequeNo)
                    Payment.ChequeId = Cheque._id
                }
                await this.addPayment(Payment);
            }

        }
    }

    getPaymentsCount() {
        return Payment.countDocuments({});
    }

    async getPayments() {
        return Payment.find().lean().populate("InvoiceID").populate("ChequeId")
    }

    async getPayment(paymentId) {
        return Payment.findOne({paymentId}).lean().populate("InvoiceID").populate("ChequeId")

    }

    async getInvoicePayment(invoiceNo) {
        invoiceNo = parseInt(invoiceNo)
        const invoice = await Invoice.findOne({InvoiceNo: invoiceNo}).lean()
        return Payment.find({InvoiceID: invoice._id}).lean().populate("InvoiceID").populate("ChequeId")
    }

    async addPayment(Payments) {
        let count = await this.getPaymentsCount()
        Payments.paymentId = count + 1
        return Payment.create(Payments)
    }

    async deletePayment(paymentId) {
        return Payment.deleteOne({paymentId})
    }

    async updatePayment(updatedPayment) {
        return Payment.findOneAndUpdate({paymentId: updatedPayment.paymentId}, updatedPayment)

    }


}

export default new paymentRepo();