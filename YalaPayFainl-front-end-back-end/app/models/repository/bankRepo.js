import Bank from "../model/bank.js";
import BankAccount from "../model/bankAccounts.js";
import fs from "fs-extra";
const banksJsonFile="data/banks.json";
const banksAccountsJsonFile="data/bank-accounts.json";

 class bankRepo {
    constructor() {
    }
    async initBanks() {

        const count= await this.getBanksCount()
        if (count===0){

            const banks = await fs.readJson(banksJsonFile);
            for (const bank of banks) {
                await this.addBank(bank);
            }

        }
    }
    getBanksCount() {
        return Bank.countDocuments({});
    }
     async getBanksbyId(bankId) {
         return Bank.findOne({bankName:bankId}).lean()

     }
    async getBanks() {
        return Bank.find().lean()
    }

    async addBank(Banks) {
        return Bank.create(Banks)
    }
    ///////////
     async initBanksAccounts() {

             const count= await this.getBanksAccountCount()
         if (count === 0) {
             const bankAcouunts = await fs.readJson(banksAccountsJsonFile);
             for (const bankAcouunt of bankAcouunts) {
                 const bank = await this.getBanksbyId(bankAcouunt.bank)
                 bankAcouunt.bankId = bank._id
                 await this.addBankAccounts(bankAcouunt);
             }

         }
         }
     getBanksAccountCount() {
         return BankAccount.countDocuments({});
     }
    async getBankAccounts() {
        return BankAccount.find().lean().populate("bankId")
    }

    async addBankAccounts(BankAccounts) {
        return BankAccount.create(BankAccounts)
    }
    async getBanksAccountbyaccountNo(bankId) {
         return BankAccount.findOne({accountNo:bankId}).lean()
     }
}

export default new bankRepo();