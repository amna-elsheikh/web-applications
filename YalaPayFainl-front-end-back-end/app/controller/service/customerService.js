import customerRepo from "../../models/repository/customerRepo.js";


const yalaPayRepo1= customerRepo

export default class customerService{


//customer
    async getCustomers(req, res) {
        try {
            let customers;
            if (req.params.customerId)
                customers = await yalaPayRepo1.getCustomer(req.params.customerId)
            else
                customers = await yalaPayRepo1.getCustomers()
            res.json(customers)
        } catch (e) {
            res.send(e)
        }
    }
    async getCustomerByName(req, res) {
        try {
            const employee = await yalaPayRepo1.getCustomerByName(req.params.companyName)
            res.json(employee)
        } catch (e) {
            res.send(e)
        }
    }
    async addCustomer(req, res) {
        try {
            const response = await yalaPayRepo1.addCustomer(req.body)
            res.send(response)
        } catch (e) {
            res.send(e)
        }
    }
    async updateCustomer(req, res) {
        try {
            const response = await yalaPayRepo1.updateCustomer(req.body)
            res.json(response)
        } catch (e) {
            res.status(500).send(e)
        }
    }
    async deleteCustomer(req, res) {
        try {
            const response = await yalaPayRepo1.deleteCustomer(req.params.customerId)
            res.send(response)
        } catch (e) {
            res.send(e)
        }
    }

}