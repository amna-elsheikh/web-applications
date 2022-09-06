import Deposit from "../model/deposit.js";
import fs from "fs-extra";
import bankRepo from "./bankRepo.js";
const depositsJsonFile="data/cheque-deposits.json";

 class depositRepo{
    constructor() {
    }
    async initSDeposit() {

        const count= await this.getDepositsCount()
        if (count === 0) {
            const deposits = await fs.readJson(depositsJsonFile);
            for (const deposit of deposits) {
                const bankAccount = await bankRepo.getBanksAccountbyaccountNo(deposit.bankAccountNo)
                deposit.bankAccountNo = bankAccount._id
                await this.addDeposit(deposit);
            }

        }
    }
    getDepositsCount() {
        return Deposit.countDocuments({});
    }

    async getDeposits() {
        return Deposit.find().lean().populate("bankAccountNo")
    }
    async getDeposit(depositId) {
        return Deposit.findOne({depositId}).lean().populate("bankAccountNo")

    }
    async addDeposit(Deposits) {
        let count = await this.getDepositsCount()
        Deposits.depositId = count+1
        return Deposit.create(Deposits)
    }

    async deleteDeposit(depositId) {
        return Deposit.deleteOne({depositId})
    }

    async updateDeposit(updatedDeposit) {
        console.log(updatedDeposit)
        return Deposit.findOneAndUpdate( {depositId: updatedDeposit.depositId },updatedDeposit)
    }
}
export default new depositRepo();