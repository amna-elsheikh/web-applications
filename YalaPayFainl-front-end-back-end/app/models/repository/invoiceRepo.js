import Invoice from "../model/invoice.js";
import Payment from "../model/payment.js";
import fs from "fs-extra";
import customerRepo from "./customerRepo.js";

const InovicesJsonFile = "data/invoices.json";

class invoiceRepo {

    constructor() {
    }

    async initInvoices() {
        const count = await this.getInovicesCount()
        if (count === 0) {
            const Inoviecs = await fs.readJson(InovicesJsonFile);
            for (const inovice of Inoviecs) {
                const customer = await customerRepo.getCustomerbyId(inovice.customerId)
                inovice.CustomerID = customer._id
                await this.addInvoice(inovice);
            }

        }
    }

    getInovicesCount() {
        return Invoice.countDocuments({});
    }

    async getInvoices() {
        return Invoice.find().lean().populate("CustomerID")
    }

    async getInvoice(InvoiceNo) {
        return Invoice.findOne({InvoiceNo}).lean().populate("CustomerID")

    }

    async getInvoicesbyId(InvoiceNo) {
        return Invoice.findOne({InvoiceNo: InvoiceNo}).lean().populate("CustomerID")

    }

    async addInvoice(invoice) {
        let count = await this.getInovicesCount()
        invoice.InvoiceNo = count+1
        return Invoice.create(invoice)
    }

    async deleteInvoice(InvoiceNo) {
        return Invoice.deleteOne({InvoiceNo})
    }

    async updateInvoice( updatedInvoice) {
        console.log(updatedInvoice)
        return Invoice.findOneAndUpdate( {InvoiceNo:updatedInvoice.InvoiceNo},updatedInvoice)
    }


    async getAfter30InvoiceSum(afterMonth) {
        afterMonth = new Date(afterMonth)
        return Invoice.aggregate([{$match:{"DueDate":{$gte:  afterMonth}}},
            { $group: {
                    _id : null,
                    sum: { $sum: '$Amount' }
                }
            },])
    }

    async get30InvoiceSum(startDate, endDate) {
        startDate =new Date(startDate)
        endDate =new Date(endDate)
        return Invoice.aggregate([{$match:{$and:[
                    {"DueDate":{$gte: startDate}},{"DueDate":{$lte: endDate}}
                ]

            }},
            { $group: {
                _id : null,
                sum: { $sum: '$Amount' }
            }
        },])
    }

    async getTotalInvoiceSum() {
        return Invoice.aggregate([{ $group: {
                _id : null,
                sum: { $sum: '$Amount' }
            }
        },])

    }
    async getInvoiceDate( status,toDate, fromDate) {
        toDate = new Date(toDate)
        fromDate = new Date(fromDate)
        if(status=="Paid"){
        return Payment.aggregate([
            { $lookup: {
                from: "invoices",
                localField: "InvoiceID",
                foreignField: "_id",
                as: "invoice"}
        },{ $unwind: "$invoice" },
            {$match:{$and :[{"invoice.DueDate": {$gte: fromDate}}, {"invoice.DueDate": {$lte: toDate}}]}},
            {$group:{_id:"$InvoiceID",totalPayment:{$sum :"$Amount"},amount:{$min:"$invoice.Amount" }, invoice: {$first: "$invoice"}
            }}
           , {$addFields: {"balance":{$subtract:["$amount","$totalPayment"]}}},
            {$match: {"balance": 0}}
        ])
        }else if (status == "Pending") {
            return Payment.aggregate([
                { $lookup: {
                        from: "invoices",
                        localField: "InvoiceID",
                        foreignField: "_id",
                        as: "invoice"}
                },{ $unwind: "$invoice" },
                {$match:{$and :[{"invoice.DueDate": {$gte: fromDate}}, {"invoice.DueDate": {$lte: toDate}}]}},
                {$group:{_id:"$InvoiceID",totalPayment:{$sum :"$Amount"},amount:{$min:"$invoice.Amount" }, invoice: {$first: "$invoice"}
                    }}
                , {$addFields: {"balance":{$subtract:["$amount","$totalPayment"]}}},
                {$match:{$expr: {$eq: ["$balance", "$amount"] } }}
            ])
        }else if(status =="Partially Paid"){
            return Payment.aggregate([
                { $lookup: {
                        from: "invoices",
                        localField: "InvoiceID",
                        foreignField: "_id",
                        as: "invoice"}
                },{ $unwind: "$invoice" },
                {$match:{$and :[{"invoice.DueDate": {$gte: fromDate}}, {"invoice.DueDate": {$lte: toDate}}]}},
                {$group:{_id:"$InvoiceID",totalPayment:{$sum :"$Amount"},amount:{$min:"$invoice.Amount" }, invoice: {$first: "$invoice"}
                    }}
                , {$addFields: {"balance":{$subtract:["$amount","$totalPayment"]}}},
                {$match:{$and : [{$expr: {$ne: ["$balance", "$amount"] } },{"balance":{$gt:0}}]}}

            ])
        }

    }
    async getInvoiceDateAll(toDate, fromDate) {
        toDate = new Date(toDate)
        fromDate = new Date(fromDate)
        return Invoice.find({$and :[{"DueDate": {$gte: fromDate}}, {"DueDate": {$lte: toDate}}]}).lean().populate("CustomerID")

    }

    async getInvoiceBalance(InvoiceNo) {
        const invoice =await this.getInvoice(InvoiceNo)
        const balance = Payment.aggregate([{$match: {"InvoiceID": invoice._id}},{ $group: {
                _id : null,
                sum: { $sum: '$Amount' }
            }
        },{$set:{balance:{$subtract:[invoice.Amount,"$sum"]}}}])
        return balance
    }
}

export default new invoiceRepo();