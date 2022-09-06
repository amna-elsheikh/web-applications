import paymentRepo from "./repository/payment-repository.js";
import invoiceRepo from "./repository/invoice-repository.js";
import customerRepo from "./repository/customer-repository.js";
import bankRepository from "./repository/bank-repository.js";
import paymentModesRepo from "./repository/paymentModes-repository.js";

let isEdit = false;
let oldChequeNo = 0;

window.onload = async () => {
    generateAccount();
    await showPaymentData();
    await showInvoiceInfo();
    await showPaymentModes();
    window.deletePayment = deletePayment;
    window.updatePayment = updatePayment;
    window.viewChequeImage = viewChequeImage;
};

const popupForm = document.querySelector(".popup-form");
const paymentTable = document.querySelector(".table");
const searchForm = document.querySelector(".search");
const invoiceInfo = document.querySelector(".invoiceinfo");
const customerInfo = document.querySelector(".custinfo");
const paymentSelect = document.querySelector("#payment-mode");
const moreDetails = document.querySelector(".moreDetails");
const accountInfo = document.querySelector(".account-info")

popupForm.addEventListener("submit", addPayment);
searchForm.addEventListener("submit", searchPayments);
paymentSelect.addEventListener("change", showMoreDetails);


function generateAccount(){
    const name = sessionStorage.getItem("name");
    accountInfo.innerHTML = `
    <img class="profile-img" src="img/profile.png" alt="" />
          <span class="account-name"
              >${name}
              <p class="account-loc">Doha, Qatar</p></span
          >
    `
}

function formToObject(form) {
    const formdata = new FormData(form);
    const data = {};
    for (const [key, value] of formdata) {
        data[key] = value;
    }
    return data;
}

async function showPaymentData() {
    const sessionInvoice = sessionStorage.getItem("invoiceNo");

    const paymentsOfInvoice = await paymentRepo.getPaymentsByInvoiceNo(sessionInvoice)
    const paymentRows = paymentsOfInvoice
        .map((payment) => paymentToRow(payment))
        .join(" ");
    paymentTable.innerHTML = `
    <tr class="table-headings">
      <th>Payment ID</th>
      <th>Invoice No</th>
      <th>Amount</th>
      <th>Payment Date</th>
      <th>Payment Mode</th>
      <th>Cheque No</th>
      <th> </th>
    </tr>
    ${paymentRows}`;
}

function paymentToRow(payment) {
    return `
    <tr class="table-row">
        <td>${payment.paymentId}</td>
        <td>${payment.InvoiceID.InvoiceNo}</td>
        <td>${payment.Amount}</td>
        <td>${formatDate(payment.PaymentDate)}</td>
        <td>${payment.PaymentMode}</td> 
        <td>${payment.ChequeId ? payment.ChequeId.ChequeNo : ''}</td>
         <td class=editing-btns>
            <img class="edit-btn" src="img/pen.svg" onclick="updatePayment('${payment.paymentId}')"/>
            <img class="delete-btn" src="img/trash.svg" onclick="deletePayment('${payment.paymentId}')"/>
        ${(payment.ChequeId) ?
        `<img class="view-btn" src="img/view.svg" onclick="viewChequeImage('${payment.ChequeId ? payment.ChequeId.ChequeNo : ''}')"/>`
        : ''
    }
        </td>
        
    </tr>
    `;
}

async function showPaymentModes() {
    const modes = await paymentModesRepo.getPaymentModes()
    const paymentOptions = modes.map(
        (paymentMode) =>
            `<option value="${paymentMode.paymentMode}">${paymentMode.paymentMode}</option>`
    );
    paymentSelect.innerHTML = paymentOptions.join(" ");
}

function showMoreDetails() {
    if (paymentSelect.value == "Cheque") {
        moreDetails.innerHTML = `
        <div class="chequeNo-select">
                            <label for="chequeNo">Cheque No</label><br />
                            <input
                                type="number"
                                id="chequeNo"
                                name="ChequeNo"
                                min="0"
                                required
                            />
                        </div>
                        <div class="drawer-select">
                            <label for="drawer">Drawer</label>
                            <input type="text" name="drawer" id="drawer" required/>
                        </div>
                        <div class="bank-select">
                            <label for="bankName">Drawer Bank</label><br />
                            <select
                                id="bank-name"
                                name="bankName"
                                required
                            ></select>
                        </div>
                        <div class="bank-status-select">
                            <label for="status">Status</label><br />
                            <select id="status" name="status" required>
                                <option value="Awaiting">Awaiting</option>
                                <option value="Deposited">Deposited</option>
                                <option value="Cashed">Cashed</option>
                                <option value="Returned">Returned</option>
                            </select>
                        </div>
                        <div class="received-date-select">
                            <label for="received-date">Received Date</label
                            ><br />
                            <input
                                type="date"
                                id="received-date"
                                name="receivedDate"
                                required
                            />
                        </div>
                        <div class="due-date-select">
                            <label for="due-date">Due Date</label
                            ><br />
                            <input
                                type="date"
                                id="due-date"
                                name="DueDate"
                                required
                            />
                        </div>
                        <div class="cheque-image-select">
                            <label for="chequeImageUri">Cheque Image</label>
                            <input type="file" id="cheque-image" name="chequeImageUri" accept="image/*">
                            <span id="chequeImageName"></span>
                        </div>
        `;
    } else {
        moreDetails.innerHTML = ``;
    }
    showBankNames();
}

async function showBankNames() {
        if (paymentSelect.value == "Cheque"){
            const bank = await bankRepository.getBanks();

            const bankSelect = document.querySelector("#bank-name");

            const banksOptions = bank.map(
                (bankName) => `<option value="${bankName._id}">${bankName.bankName}</option>`
            );
            bankSelect.innerHTML = banksOptions.join(" ");}

}
async function addPayment(e) {
    e.preventDefault();
    const sessionInvoice = sessionStorage.getItem("invoiceNo");
    console.log(sessionInvoice)
    if (paymentSelect.value == "Cheque") {
        const data = formToObject(e.target);
        console.log(data);
        const payment = {
            paymentId: parseInt(data.paymentId),
            InvoiceNo: parseInt(sessionInvoice),
            Amount: parseInt(data.Amount),
            PaymentDate: data.PaymentDate,
            PaymentMode: "Cheque",
            ChequeNo: data.ChequeNo,
        };
        const cheque = {
            ChequeNo: parseInt(data.ChequeNo),
            Amount: parseInt(data.Amount),
            drawer: data.drawer,
            bankName: data.bankName,
            status: data.status,
            receivedDate: data.receivedDate,
            DueDate: data.dueDate,
            chequeImageUri: data.chequeImageUri.name,
        };
        console.log(cheque)
        if (isEdit) {
            payment.InvoiceNo = parseInt(sessionInvoice);
            payment.InvoiceID = sessionStorage.getItem("invoiceId")
            await paymentRepo.updatePayment(payment);
            await paymentRepo.updateCheque(cheque, oldChequeNo);
            isEdit = false;
        } else {
            payment.InvoiceNo = parseInt(sessionInvoice);
            payment.InvoiceID = sessionStorage.getItem("invoiceId")
            await paymentRepo.addPayment(payment);
            await paymentRepo.addCheque(cheque);
        }
    } else {//other payment bank transfer, credit card
        const payment = formToObject(e.target);
        payment.InvoiceNo = parseInt(sessionInvoice);

        payment.Amount = parseInt(payment.Amount);
        payment.InvoiceID = sessionStorage.getItem("invoiceId")
        if (isEdit) {

            payment.paymentId = parseInt(payment.paymentId);
            await paymentRepo.updatePayment(payment);
            isEdit = false;
        } else {

            await paymentRepo.addPayment(payment);
        }
    }

    await showPaymentData();
    e.target.reset();
}


async function searchPayments(e) {
    e.preventDefault();
    const searchInput = formToObject(e.target);
    const payment = await paymentRepo.getPayment(parseInt(searchInput.paymentId));
    const sessionInvoice = sessionStorage.getItem("invoiceNo");
    if (payment.InvoiceID.InvoiceNo != sessionInvoice) {
        paymentTable.innerHTML = `
        <tr class="table-headings">
      <th>Payment ID</th>
      <th>Invoice No</th>
      <th>Amount</th>
      <th>Payment Date</th>
      <th>Payment Mode </th>
      <th>Cheque No</th>
      <th>        </th>
    </tr>
    <tr><td>Not Found</td></tr>
        `;
    } else {
        paymentTable.innerHTML = `
    <tr class="table-headings">
      <th>Payment ID</th>
      <th>Invoice No</th>
      <th>Amount</th>
      <th>Payment Date</th>
      <th>Payment Mode </th>
      <th>Cheque No</th>
      <th>        </th>
    </tr>
    ${paymentToRow(payment)}`;
    }
}

async function deletePayment(paymentID) {
    if (paymentSelect.value == "Cheque") {
        const payment = await paymentRepo.getPayment(paymentID);
        await paymentRepo.deleteCheque(payment.ChequeId);
    }
    await paymentRepo.deletePayment(parseInt(paymentID));
    await showPaymentData();
}

async function updatePayment(paymentID) {
    isEdit = true;

    const payment = await paymentRepo.getPayment(parseInt(paymentID));
console.log(payment)
    document.querySelector("#payment-id").value = payment.paymentId;
    document.querySelector("#invoiceNo").value = payment.InvoiceID.InvoiceNo;
    document.querySelector("#amount").value = payment.Amount;
    document.querySelector("#payment-date").value =formatDate(payment.PaymentDate) ;
    document.querySelector("#payment-mode").value = payment.PaymentMode;

    showMoreDetails();
    if (paymentSelect.value == "Cheque") {

        const cheque = await paymentRepo.getCheque(parseInt(payment.ChequeId.ChequeNo));
        oldChequeNo = cheque.ChequeNo;
        document.querySelector("#chequeNo").value = cheque.ChequeNo;
        document.querySelector("#drawer").value = cheque.drawer;
        document.querySelector("#bank-name").value = cheque.bankId;
        document.querySelector("#status").value = cheque.status;
        document.querySelector("#received-date").value = formatDate(cheque.receivedDate);
        document.querySelector("#due-date").value =formatDate( cheque.DueDate);
        if (cheque.chequeImageUri !== null)
        document.querySelector("#chequeImageName").innerHTML = cheque.chequeImageUri;
    }
}

async function showInvoiceInfo() {
  const sessionInvoice = sessionStorage.getItem("invoiceNo");
    const invoice = await invoiceRepo.getInvoice(parseInt(sessionInvoice));
    await showCustomerInfo(invoice.InvoiceNo);
    invoiceInfo.innerHTML = `
    <h3>Invoice Details</h3>
                    <p>Invoice No:</p>
                    <span>${invoice.InvoiceNo}</span>
                    <p>Amount:</p>
                    <span>${invoice.Amount}</span>
                    <p>Invoice Date:</p>
                    <span>${formatDate(invoice.InvoiceDate)}</span>
                    <p>Due Date:</p>
                    <span>${formatDate(invoice.DueDate)}</span>
    `;
}
function formatDate(date){
    date=new Date(date)
    let m=date.getMonth()+1
    if(m<10){
        m="0"+m;
    }
    let d=date.getDate()
    if(d<10){
        d="0"+d;
    }
    return date.getFullYear()+"-"+m+"-"+d
}
async function viewChequeImage(chequeNo){
    const cheque = await paymentRepo.getCheque(parseInt(chequeNo));
    const imageURL = cheque.chequeImageUri;
    window.open(`./img/cheques/${imageURL}`, '_blank');
}
async function showCustomerInfo(customerId) {
    const customer = await customerRepo.getCustomer(customerId);
    customerInfo.innerHTML = `
    <h3>Customer Details</h3>
                    <p>Customer ID:</p>
                    <span>${customer.customerId}</span>
                    <p>Company Name:</p>
                    <span>${customer.companyName}</span>
                    <p>Address:</p>
                    <span>${customerAddress(customer.address)}</span>
                    <p>Contact Name:</p>
                <span>${customer.contactDetails.firstName} ${customer.contactDetails.lastName
    }
                 </span>
                    <p>Email:</p>
                    <span>${customer.contactDetails.email}</span>
                    <p>Phone:</p>
                    <span>${customer.contactDetails.mobile}</span>
    `;
}

function customerAddress(address) {
    return `${address.street}, ${address.city}, ${address.country}`;
}
