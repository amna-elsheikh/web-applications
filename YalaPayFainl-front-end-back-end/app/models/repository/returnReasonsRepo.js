import returnReasons from "../model/return-reasons.js";
import fs from "fs-extra";
const returnReasonsJsonFile="data/return-reasons.json";
class returnReasonsRepo {
    constructor() {
    }

    async initreturnReasons() {

        const count= await this.getreturnReasonsCount()
        if (count===0){

            const returnReasons = await fs.readJson(returnReasonsJsonFile);
            for (const returnReason of returnReasons) {
                await this.addReturnReason(returnReason);
            }

        }
    }

    async getreturnReasonsCount() {
        return returnReasons.countDocuments({});
    }

    async addReturnReason(returnReason) {
        return returnReasons.create(returnReason)
    }
    async getReturnReason() {
        return returnReasons.find().lean()

    }
}
export default new returnReasonsRepo();