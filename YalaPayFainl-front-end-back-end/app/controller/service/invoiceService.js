
import invoiceRepo from "../../models/repository/invoiceRepo.js";

const yalaPayRepo1= invoiceRepo

export default class invoiceService{

    //invoice
    async getInvoices(req, res) {
        try {
            let invoices;
            if (req.params.InvoiceNo)
                invoices = await yalaPayRepo1.getInvoice(req.params.InvoiceNo)
            else
                invoices = await yalaPayRepo1.getInvoices()
            res.json(invoices)
        } catch (e) {
            res.send(e)
        }
    }
    async getInvoiceBalance(req, res) {
        try {
            let invoices= await yalaPayRepo1.getInvoiceBalance(req.params.InvoiceNo)
            res.json(invoices)
        } catch (e) {
            res.send(e)
        }
    }
    //////////////
    async getTotalInvoiceSum(req, res) {
        try {
            let invoices = await yalaPayRepo1.getTotalInvoiceSum()
            res.json(invoices)
        } catch (e) {
            res.send(e)
        }
    }
         async get30InvoiceSum(req, res) {
        try {
            let invoices = await yalaPayRepo1.get30InvoiceSum(req.params.startDate,req.params.endDate)

            res.json(invoices)
        } catch (e) {
            console.log(e)
            res.send(e)
        }
    }
             async getAfter30InvoiceSum(req, res) {
        try {
            let invoices= await yalaPayRepo1.getAfter30InvoiceSum(req.params.afterMonth)

            res.json(invoices)
        } catch (e) {
            console.log(e)
            res.send(e)
        }
    }
    async getInvoiceDate(req, res) {
        try {

            let cheque = await yalaPayRepo1.getInvoiceDate(req.params.status,req.params.toDate,req.params.fromDate)
            res.json(cheque)
        } catch (e) {
            console.log(e)
            res.send(e)
        }
    }   async getInvoiceDateAll(req, res) {
        try {
            let cheque = await yalaPayRepo1.getInvoiceDateAll(req.params.toDate,req.params.fromDate)

            res.json(cheque)
        } catch (e) {
            console.log(e)
            res.send(e)
        }
    }
    ///////////////////////////
    async addInvoice(req, res) {
        try {
            const response = await yalaPayRepo1.addInvoice(req.body)
            res.send(response)
        } catch (e) {
            res.send(e)
        }
    }
    async updateInvoice(req, res) {
        try {
            const response = await yalaPayRepo1.updateInvoice(req.body)
            res.json(response)
        } catch (e) {
            res.status(500).send(e)
        }
    }
    async deleteInvoice(req, res) {
        try {
            const response = await yalaPayRepo1.deleteInvoice(req.params.InvoiceNo)
            res.send(response)
        } catch (e) {
            res.send(e)
        }
    }



}