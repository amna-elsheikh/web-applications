
class ChequeDepositRepository {
    async getDeposit(depositId) {
        const url = `/api/deposit/${depositId}`
        const data = await fetch(url)
        return data.json()
    }

    async   getDeposits() {
        const url = `/api/deposits`
        const data = await fetch(url)
        return data.json()    }

    async addDeposit(chequeDeposit) {
        const url = `/api/deposits`
        const init = {
            method: 'POST',
            body : JSON.stringify(chequeDeposit),
            headers: {'Content-Type' : 'application/json'}
        }
        const response = await fetch(url, init)
        return response    }

    async  updateDeposit(updatedChequeDeposit) {
        const url = `/api/deposits`
        const init = {
            method: 'PUT',
            body : JSON.stringify(updatedChequeDeposit),
            headers: {'Content-Type' : 'application/json'}
        }
        const response = await fetch(url, init)
        return response
    }

    async  deleteDeposit(depositId) {
        return await fetch(`/api/deposit/${depositId}`, {method: 'delete'});

    }
}

export default new ChequeDepositRepository();