import express from 'express'
import router from './controller/router.js'
import morgan from 'morgan'
import mongoose from "mongoose";
import userRepo from "./models/repository/userRepo.js";
import customerRepo from "./models/repository/customerRepo.js";
import invoiceRepo from "./models/repository/invoiceRepo.js";
import paymentRepo from "./models/repository/paymentRepo.js";
import chequeRepo from "./models/repository/chequeRepo.js";
import bankRepo from "./models/repository/bankRepo.js";
import depositRepo from "./models/repository/depositRepo.js";
import returnReasonsRepo from "./models/repository/returnReasonsRepo.js";
import paymentModesRepo from "./models/repository/paymentModesRepo.js";
import cors from 'cors'


//port number
const port = 9909
const app = express()
app.use(cors());

/*Database connection*/
const uri = 'mongodb://localhost:27017/yalaPay-db'
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.connect(uri, options, async () => {
    console.log(`successfully connected to database`)
    await userRepo.initUsers()
    await returnReasonsRepo.initreturnReasons()
    await paymentModesRepo.initpaymentModes()
    await customerRepo.initCustomers()
    await invoiceRepo.initInvoices()
    await bankRepo.initBanks()
    await  bankRepo.initBanksAccounts()
    await chequeRepo.initCheque()
    await paymentRepo.initPayments()
    await  depositRepo.initSDeposit()

})

//two types [dynamic , static]
app.use(express.static('views'))
//a middleware
app.use(morgan('dev'))
app.use(express.json())

app.use('/api', router)

//CRUD operations on
app.listen(port, () => {
    console.log(`Server started @http://localhost:${port}/login.html`)
})
