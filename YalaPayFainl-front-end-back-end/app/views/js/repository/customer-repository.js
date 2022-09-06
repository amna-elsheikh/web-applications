
class CustomerRepository {
    async getCustomer(customerId) {
        const url = `/api/customer/${customerId}`
        const data = await fetch(url)
        return data.json()
    }

    async getCustomerByName(customerName) {
        const url = `/api/customer/name/${customerName}`
        const data = await fetch(url)
        return data.json()
    }

    async  getCustomers() {
        const url = `/api/customers`
        const data = await fetch(url)
        return data.json()
    }

    async addCustomer(customer) {
        const url = `/api/customers`
        const init = {
            method: 'POST',
            body : JSON.stringify(customer),
            headers: {'Content-Type' : 'application/json'}
        }
        const response = await fetch(url, init)
        return response
    }
    async updateCustomer(updatedCustomer) {
        const url = `/api/customers`
        const init = {
            method: 'PUT',
            body : JSON.stringify(updatedCustomer),
            headers: {'Content-Type' : 'application/json'}
        }
        const response = await fetch(url, init)
        return response
    }

    async deleteCustomer(customerId) {
        return await fetch(`/api//customer/${customerId}`, {method: 'DELETE'});

    }
}

export default new CustomerRepository();