import Cheque from "../model/cheque.js";
import fs from "fs-extra";
import bankRepo from "./bankRepo.js";
const chequeJsonFile = "data/cheques.json";
class chequeRepo {
    constructor() {
    }
    async initCheque() {
        const count = await this.getChequeCount()
        if (count === 0) {
            const Cheques = await fs.readJson(chequeJsonFile);
            for (const Cheque of Cheques) {
                const bank = await bankRepo.getBanksbyId(Cheque.bankName)
                Cheque.bankId = bank._id
                await this.addCheque(Cheque);
            }
        }
    }
    getChequeCount() {
        return Cheque.countDocuments({});
    }
    async getChequebyId(ChequeNo) {
        return Cheque.findOne({ChequeNo:ChequeNo}).lean()

    }
    async getCheques() {
        return Cheque.find().lean().populate("bankId")
    }

    async getCheque(ChequeNo) {
        return Cheque.findOne({ChequeNo}).lean()

    }

    async addCheque(Cheques) {

        return Cheque.create(Cheques)
    }

    async deleteCheque(ChequeNo) {
        return Cheque.deleteOne({ChequeNo})
    }

    async updateCheque(updatedCheque) {
        return Cheque.findOneAndUpdate( {_id:updatedCheque._id},updatedCheque)

    }
    async getChequesSum(status) {
        return Cheque.aggregate([{$match:{"status": status}},
            { $group: {
                    _id : null,
                    sum: { $sum: '$Amount' }
                }
            },])
    }
    async getTotalChequesSum() {
        return Cheque.aggregate([{ $group: {
                _id : null,
                sum: { $sum: '$Amount' }
            }
        },])
    }
    async getChequesDate(status,toDate,fromDate) {
        toDate =new Date(toDate)
        fromDate =new Date(fromDate)
        if (status=="Awaiting") {
            return Cheque.aggregate([{
                $match:
                    {
                        "status": status
                    }
            },
                {$match: {$and: [{"DueDate": {$gte: fromDate}}, {"DueDate": {$lte: toDate}}]}},])
        }else if (status=="Deposited"){
            return Cheque.aggregate([{
                $match:
                    {
                        "status": status
                    }
            },
                {$match: {$and: [{"DueDate": {$gte: fromDate}}, {"DueDate": {$lte: toDate}}]}},])
        }else if (status=="Cashed") {
            return Cheque.aggregate([{
                $match:
                    {
                        "status": status
                    }
            },
                {$match: {$and: [{"DueDate": {$gte: fromDate}}, {"DueDate": {$lte: toDate}}]}},])
        }else if (status=="Returned") {
            return Cheque.aggregate([{
                $match:
                    {
                        "status": status
                    }
            },
                {$match: {$and: [{"DueDate": {$gte: fromDate}}, {"DueDate": {$lte: toDate}}]}},])
        }

    }
    async getChequesDateAll(toDate,fromDate) {
        toDate =new Date(toDate)
        fromDate =new Date(fromDate)
        return Cheque.aggregate([
            {$match:{$and:[
                    {"DueDate":{$gte: fromDate}},{"DueDate":{$lte: toDate}}
                ]

            }},

        ]).lean().populate("bankId")
    }

}
export default new chequeRepo();