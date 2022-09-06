import Customer from "../model/customer.js";
import fs from "fs-extra";
const customerJsonFile="data/customers.json";

 class customerRepo{
     constructor() {
     }
     async initCustomers() {
         const count= await this.getCustomersCount()
        if (count===0){
            const customers = await fs.readJson(customerJsonFile);
            for (const customer of customers) {
                await this.addCustomer(customer);
            }
        }
    }
    getCustomersCount() {
        return Customer.countDocuments({});
    }
    async getCustomers() {
        return Customer.find().lean()

    }
    async getCustomer(customerId) {
        return Customer.findOne({customerId}).lean()

    }
    async getCustomerbyId(customerId) {
        return Customer.findOne({customerId}).lean()

    }
    async addCustomer(customer) {
        let count = await this.getCustomersCount()
        customer.customerId = count+1
        console.log(customer)
        return Customer.create(customer)
    }

    async updateCustomer(updatedCustomer) {
        console.log(updatedCustomer)
        return Customer.findOneAndUpdate({customerId:updatedCustomer.customerId} ,updatedCustomer)
    }

    async deleteCustomer(customerId) {
        return Customer.deleteOne({customerId})
    }
    async getCustomerByName(companyName) {
         return Customer.findOne({companyName}).lean()

    }
}
export default new customerRepo();