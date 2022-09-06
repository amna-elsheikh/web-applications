
class InvoiceRepository {


    async getInvoice(InvoiceNo) {
        const url = `/api/invoice/${InvoiceNo}`
        const data = await fetch(url)
        return data.json()
    }

    async getInvoices() {
        const url = `/api/invoices`
        const data = await fetch(url)
        return data.json()

    }


    async getTotalInvoiceSum() {
        const url = `/api/invoices/sum`
        const data = await fetch(url)
        return data.json()
    }
    async get30InvoiceSum(today, afterToday) {
        const url = `/api/invoices/sum/${today}/${afterToday}`
        const data = await fetch(url)
        return data.json()
    }

    async getAfter30InvoiceSum(afterMonth) {
        const url = `/api/invoices/sum/${afterMonth}`
        const data = await fetch(url)
        return data.json()
    }
    async addInvoice(invoice) {
        const url = `/api/invoices`
        const init = {
            method: 'POST',
            body : JSON.stringify(invoice),
            headers: {'Content-Type' : 'application/json'}
        }
        const response = await fetch(url, init)
        return response
    }

    async   updateInvoice(updatedInvoice)  {
        const url = `/api/invoices`
        const init = {
            method: 'PUT',
            body : JSON.stringify(updatedInvoice),
            headers: {'Content-Type' : 'application/json'}
        }
        const response = await fetch(url, init)
        return response
    }

    async deleteInvoice(InvoiceNo) {
        return await fetch(`/api/invoice/${InvoiceNo}`, {method: 'delete'});

    }

    async getInvoiceBalance(InvoiceNo) {
        const url = `/api/invoice/balance/${InvoiceNo}`
        const data = await fetch(url)
        return data.json()
    }

    async getInvoiceDate(status,toDate, fromDate) {

        const url = `/api/invoices/search/${status}/${toDate}/${fromDate}`
        const data = await fetch(url)
        return data.json()
    }
    async getInvoiceDateAll(toDate, fromDate) {

        const url = `/api/invoices/search/${toDate}/${fromDate}`
        const data = await fetch(url)
        return data.json()
    }



}

export default new InvoiceRepository();