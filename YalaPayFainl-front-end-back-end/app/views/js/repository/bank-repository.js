
class bankRepository {
    async getBanks() {
        const url = `/api/bank`
        const data = await fetch(url)
        return data.json()
    }

    async  getBankAccount() {
        const url = `/api/BankAccounts`
        const data = await fetch(url)
        return data.json()
    }

}

export default new bankRepository();