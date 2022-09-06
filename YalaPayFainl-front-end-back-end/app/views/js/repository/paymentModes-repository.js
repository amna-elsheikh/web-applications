
class paymentModesRepo {
    async getPaymentModes() {
        const url = `/api/paymentModes`
        const data = await fetch(url)
        return data.json()
    }



}

export default new paymentModesRepo();