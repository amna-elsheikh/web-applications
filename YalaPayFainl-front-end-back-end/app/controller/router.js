import express from 'express'
import paymentService from "./service/paymentService.js";
import invoiceService from "./service/invoiceService.js"
import customerService from "./service/customerService.js";
import chequeService from "./service/chequeService.js";
import depositService from "./service/depositService.js";
import UserService from "./service/userService.js";
import bankService from "./service/bankService.js";
import paymentModesService from "./service/paymentModesService.js";
import returnReasonsService from "./service/returnReasonsService.js";

const router = express.Router()

const UserService1=new UserService();
const invoiceService1=new invoiceService();
const paymentService1=new paymentService();
const customerService1=new customerService();
const chequeService1=new chequeService();
const depositService1=new depositService();
const bankService1=new bankService();
const paymentModesService1=new paymentModesService();
const returnReasonsService1=new returnReasonsService();
router.route('/login')
    .get(UserService1.getUser)


router.route('/login/:email/:password')
    .get(UserService1.getUser)
    .post(UserService1.addUser)


router.route('/customers')
    .get(customerService1.getCustomers)
    .post(customerService1.addCustomer)
    .put(customerService1.updateCustomer)

router.route('/customer/name/:companyName')
    .get(customerService1.getCustomerByName)
router.route('/customer/:customerId')
    .get(customerService1.getCustomers)
    .delete(customerService1.deleteCustomer)


router.route('/invoices')
    .get(invoiceService1.getInvoices)
    .post(invoiceService1.addInvoice)
    .put(invoiceService1.updateInvoice)
router.route('/invoice/:InvoiceNo')
    .get(invoiceService1.getInvoices)
    .delete(invoiceService1.deleteInvoice)
router.route('/invoices/sum')
    .get(invoiceService1.getTotalInvoiceSum)
router.route('/invoices/sum/:startDate/:endDate')
    .get(invoiceService1.get30InvoiceSum)
router.route('/invoices/sum/:afterMonth')
    .get(invoiceService1.getAfter30InvoiceSum)
router.route('/invoices/search/:status/:toDate/:fromDate')
    .get(invoiceService1.getInvoiceDate)
router.route('/invoices/search/:toDate/:fromDate')
    .get(invoiceService1.getInvoiceDateAll)
router.route('/invoice/balance/:InvoiceNo')
    .get(invoiceService1.getInvoiceBalance)



router.route('/payments')
    .get(paymentService1.getPayments)
    .post(paymentService1.addPayment)
    .put(paymentService1.updatePayment)

router.route('/payment/:paymentId')
    .get(paymentService1.getPayments)
    .delete(paymentService1.deletePayment)
router.route('/payments/invoice/:invoiceNo')
    .get(paymentService1.getInvoicePayment)

router.route('/deposits')
    .get(depositService1.getDeposits)
    .post(depositService1.addDeposit)
    .put(depositService1.updateDeposit)
router.route('/deposit/:depositId')
    .get(depositService1.getDeposits)
    .delete(depositService1.deleteDeposit)

router.route('/cheques')
    .get(chequeService1.getCheques)
    .post(chequeService1.addCheque)

router.route('/cheque/:ChequeNo')
    .get(chequeService1.getCheques)
    .put(chequeService1.updateCheque)
    .delete(chequeService1.deleteCheque)
router.route('/cheques/sum/:status')
    .get(chequeService1.getChequesSum)
router.route('/cheques/sum')
    .get(chequeService1.getTotalChequesSum)
router.route('/cheques/:status/:toDate/:fromDate')
    .get(chequeService1.getChequesDate)
router.route('/cheques/:toDate/:fromDate')
    .get(chequeService1.getChequesDateAll)

router.route('/bank')
    .get(bankService1.getBanks)
    .post(bankService1.addBank)
router.route('/BankAccounts')
    .get(bankService1.getBankAccounts)
    .post(bankService1.addBankAccounts)

router.route('/paymentModes')
    .get(paymentModesService1.getpaymentModes)
    .post(paymentModesService1.addpaymentModes)
router.route('/returnReasons')
    .get(returnReasonsService1.getReturnReasonsServices)
    .post(returnReasonsService1.addReturnReasonsService)

export default router;



