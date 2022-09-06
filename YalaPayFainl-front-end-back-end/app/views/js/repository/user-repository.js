
class UserRepository {

    async  getUser(email,password) {
        const url = `/api/login/${email}/${password}`
        const data = await fetch(url)
        return data.json()
    }

}

export default new UserRepository();