
class returnReasonsRepository {
    async getReturnReasons() {
        const url = `/api/returnReasons`
        const data = await fetch(url)
        return data.json()
    }



}

export default new returnReasonsRepository();