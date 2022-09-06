import Modes from "../model/payment-modes.js";
import fs from "fs-extra";
const paymentModesJsonFile="data/payment-modes.json";
class paymentModesRepo {
    constructor() {
    }

    async initpaymentModes() {

        const count= await this.getpaymentModesCount()
        if (count===0){

            const paymentModes = await fs.readJson(paymentModesJsonFile);
            for (const paymentMode of paymentModes) {
                await this.addpaymentMode(paymentMode);
            }

        }
    }
    async getpaymentModesCount() {
        return Modes.countDocuments({});
    }

    async addpaymentMode(paymentMode) {
        return Modes.create(paymentMode)
    }

    async getPaymentMode() {
        return Modes.find().lean()

    }
}
export default new paymentModesRepo();