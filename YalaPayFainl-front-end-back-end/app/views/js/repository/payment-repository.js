

class PaymentRepository {

    async  getPayment(paymentId) {
        const url = `/api/payment/${paymentId}`
        const data = await fetch(url)
        return data.json()
    }

    async getPaymentsByInvoiceNo(invoiceNo) {
        const url = `/api/payments/invoice/`+invoiceNo
        const data = await fetch(url)
        return data.json()
    }

    async   addPayment(payment) {
        const url = `/api/payments`
        const init = {
            method: 'POST',
            body : JSON.stringify(payment),
            headers: {'Content-Type' : 'application/json'}
        }
        const response = await fetch(url, init)
        return response    }

    async   updatePayment(updatePayment) {
        const url = `/api/payments`
        const init = {
            method: 'PUT',
            body : JSON.stringify(updatePayment),
            headers: {'Content-Type' : 'application/json'}
        }
        const response = await fetch(url, init)
        return response
    }

    async  deletePayment(paymentId) {
        return await fetch(`/api/payment/${paymentId}`, {method: 'delete'});

    }


    async  getCheque(chequeNo) {
        const url = `/api/cheque/${chequeNo}`
        const data = await fetch(url)
        return data.json()
    }

    async   getCheques() {
        const url = `/api/cheques`
        const data = await fetch(url)
        return data.json()
    }

    async   getTotalChequesSum() {
        const url = `/api/cheques/sum`
        const data = await fetch(url)
        return data.json()
    }
    async   getChequesSum(status) {
        const url = `/api/cheques/sum/${status}`
        const data = await fetch(url)
        return data.json()
    }

    async getChequesDate(status,toDate, fromDate) {

        const url = `/api/cheques/${status}/${toDate}/${fromDate}`
        const data = await fetch(url)
        return data.json()
    }
    async getChequesDateAll(toDate, fromDate) {

        const url = `/api/cheques/${toDate}/${fromDate}`
        const data = await fetch(url)
        return data.json()
    }


    async   addCheque(cheque) {
        const url = `/api/cheques`
        const init = {
            method: 'POST',
            body : JSON.stringify(cheque),
            headers: {'Content-Type' : 'application/json'}
        }
        const response = await fetch(url, init)
        return response    }

    async  updateCheque(updatedCheque, oldChequeNo)  {
        const url = `/api/cheque/${oldChequeNo}`
        const init = {
            method: 'PUT',
            body : JSON.stringify(updatedCheque),
            headers: {'Content-Type' : 'application/json'}
        }
        const response = await fetch(url, init)
        return response
    }

    async  deleteCheque(chequeNo) {
        return await fetch(`/api/cheque/${chequeNo}`, {method: 'delete'});

    }
}

export default new PaymentRepository();