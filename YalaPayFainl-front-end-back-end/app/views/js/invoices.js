import invoiceRepo from "./repository/invoice-repository.js";
import customerRepo from "./repository/customer-repository.js";

let isEdit = false;

window.onload = async () => {
    generateAccount();

    await getInvoicesBalance();
    await showInvoiceData();
    await showCustomerNames();
    await showCounter();
    window.deleteInvoice = deleteInvoice;
    window.updateInvoice = updateInvoice;
    window.goToPaymentpage = goToPaymentpage;
    window.addInvoice=addInvoice;
};

const popupForm = document.querySelector(".popup-form");
const invoiceTable = document.querySelector(".table");
const customerSelect = document.querySelector("#customer-name");
const searchForm = document.querySelector(".search");
const header = document.querySelector(".header");
const reportForm = document.querySelector(".status-report");
const accountInfo = document.querySelector(".account-info")

searchForm.addEventListener("submit", searchInvoices);
reportForm.addEventListener("submit", invoiceReport);


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

async function showInvoiceData() {
    const invoices = await invoiceRepo.getInvoices();
for (let invoice of invoices){
    invoice.balance = await invoiceRepo.getInvoiceBalance(invoice.InvoiceNo)
    if (invoice.balance.length ==0){
        invoice.balance = invoice.Amount
    }else {
        invoice.balance = invoice.balance[0].balance
    }
}
    console.log("--------------",invoices)
    const invoiceRows = invoices
        .map((invoice) => invoiceToRow(invoice))
        .join(" ");
    invoiceTable.innerHTML = `
    <tr class="table-headings">
      <th>Invoice No.</th>
      <th>Customer ID</th>
      <th>Customer Name</th>
      <th>Amount</th>
      <th>Balance</th>
      <th>Invoice Date</th>
      <th>Due Date</th>
      <th>        </th>
    </tr>
    ${invoiceRows}`;
}

function showInvoiceReport(invoices) {
    console.log("*********",invoices)
    const invoiceRows = invoices
        .map((invoice) => invoiceToRow(invoice))
        .join(" ");
    invoiceTable.innerHTML = `
    <tr class="table-headings">
      <th>Invoice No.</th>
      <th>Customer ID</th>
      <th>Customer Name</th>
      <th>Amount</th>
      <th>Balance</th>
      <th>Invoice Date</th>
      <th>Due Date</th>
      <th>        </th>
    </tr>
    ${invoiceRows}`;
}

 function invoiceToRow(invoice) {

    return `
    <tr class="table-row">
        <td onclick="goToPaymentpage(${invoice.InvoiceNo},'${invoice._id}')">${invoice.InvoiceNo}</td>
        <td onclick="goToPaymentpage(${invoice.InvoiceNo},'${invoice._id}')">${invoice.CustomerID.customerId}</td>
        <td onclick="goToPaymentpage(${invoice.InvoiceNo},'${invoice._id}')">${invoice.CustomerID.companyName}  </td>
        <td onclick="goToPaymentpage(${invoice.InvoiceNo},'${invoice._id}')">${invoice.Amount}</td>
        <td onclick="goToPaymentpage(${invoice.InvoiceNo},'${invoice._id}')">${invoice.balance}</td>
        <td onclick="goToPaymentpage(${invoice.InvoiceNo},'${invoice._id}')">${formatDate( invoice.InvoiceDate)}</td>
        <td onclick="goToPaymentpage(${invoice.InvoiceNo},'${invoice._id}')">${formatDate(invoice.DueDate)}</td>
        <td class=editing-btns>
            <img class="edit-btn" src="img/pen.svg" onclick="updateInvoice('${invoice.InvoiceNo}')"/>
            <img class="delete-btn" src="img/trash.svg" onclick="deleteInvoice('${invoice.InvoiceNo}')"/> </td>
    </tr>
    `;
}

async function showCustomerNames() {
    const customers = await customerRepo.getCustomers();
    const customerOptions = customers.map(
        (customer) =>
            `<option value="${customer.customerId}">${customer.companyName}</option>`
    );
    customerSelect.innerHTML = customerOptions.join(" ");
}
////////////
async function addInvoice(e) {
    e.preventDefault();
    const invoice = formToObject(e.target);
    //assign the customer ID
    const customer = await customerRepo.getCustomer(invoice.customerName);
    console.log(customer)
    invoice.CustomerID= customer._id;
    console.log(invoice)

    if (isEdit) {
        invoice.InvoiceNo = parseInt(invoice.InvoiceNo);
        await invoiceRepo.updateInvoice(invoice);
      await getInvoicesBalance();
        isEdit = false;
    } else {
        //assign the invoice number
        await invoiceRepo.addInvoice(invoice);
       await getInvoicesBalance();
    }

   await showInvoiceData();
   popupForm.reset();
}

async function deleteInvoice(InvoiceNo) {
    await invoiceRepo.deleteInvoice(parseInt(InvoiceNo));
    await showInvoiceData();
}

async function updateInvoice(invoiceNo) {

    const invoice = await invoiceRepo.getInvoice(parseInt(invoiceNo));
    console.log(invoice)
    document.querySelector("#invoiceNo").value = invoice.InvoiceNo;
    document.querySelector("#customer-id").value = invoice.CustomerID.customerId.toString();
    console.log("+++",invoice.CustomerID.customerId)
    document.querySelector("#customer-name").value = invoice.CustomerID.customerId.toString();;
    document.querySelector("#amount").value = invoice.Amount;
    document.querySelector("#invoice-date").value = formatDate(invoice.InvoiceDate);
    document.querySelector("#due-date").value = formatDate(invoice.DueDate);
    isEdit = true;
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

async function getInvoicesBalance() {
    let invoiceBalance = await invoiceRepo.getTotalInvoiceSum()
  /*  const payments = await paymentRepo.getPayments();
    const invoices = await invoiceRepo.getInvoices();
    for (const invoice of invoices) {
        const invoiceNoPayments = payments.filter(
            (payment) => payment.InvoiceNo == invoice.InvoiceNo
        );
         let balance = invoice.Amount;
          for (const payment of invoiceNoPayments) {
              balance -= payment.Amount;
          }
          const invoiceBalance = {
              InvoiceNo: invoice.InvoiceNo,
              balance: balance,
          };*/
    invoiceBalance =invoiceBalance[0].sum
         // balances.push(invoiceBalance);
console.log("invoiceBalance",invoiceBalance)
 return invoiceBalance
    }

    async function searchInvoices(e) {
        e.preventDefault();
        const searchInput = formToObject(e.target);
        const invoice = await invoiceRepo.getInvoice(searchInput.invoiceNo)
        invoice.balance = await invoiceRepo.getInvoiceBalance(invoice.InvoiceNo)
        if (invoice.balance.length ==0){
            invoice.balance = invoice.Amount
        }else {
            invoice.balance = invoice.balance[0].balance
        }
        invoiceTable.innerHTML = `
    <tr class="table-headings">
      <th>Invoice No.</th>
<!--      <th>Customer ID</th>-->
<!--      <th>Customer Name</th>-->
      <th>Amount</th>
      <th>Balance</th>
      <th>Invoice Date</th>
      <th>Due Date</th>
      <th>        </th>
    </tr>
    ${invoiceToRow(invoice)}`;
    }

    async function showCounter() {
    console.log("------------------")
        const invoices = await invoiceRepo.getInvoices();
        const invoicesCount = invoices.length;
        console.log("invoicesCount",invoicesCount)
        let totalInvoiceSum = await getInvoicesBalance()
        console.log("totalInvoiceSum",totalInvoiceSum)
       /* let sum = 0;
        for (const invoice of invoices) {
            sum += invoice.Amount;
        }*/
        header.innerHTML = `
    <h1 class="header-title">Invoices</h1>
    <div class="count-card">
        <div class="icon-bg">
            <img src="img/wallet.svg" alt="" />
        </div>
        <p class="counter">
            ${invoicesCount} <span class="counter-desc">Total Invoices </span>
        </p>
        <div class="icon-bg">
            <img src="img/money-bill-1-wave.svg" alt="" />
        </div>
        <p class="counter">
            $ ${totalInvoiceSum}  <span class="counter-desc">Sum Invoices</span>
        </p>
    </div>
    `;
    }

    function goToPaymentpage(invoiceNo, invoiceId) {
    console.log("goToPaymentpage")
        sessionStorage.setItem("invoiceNo", invoiceNo);
        sessionStorage.setItem("invoiceId", invoiceId);
        document.location = "payments.html";
    }


    async function invoiceReport(e) {
        e.preventDefault();
        const searchInput = formToObject(e.target);
        const toDate = searchInput.toDate;
        const fromDate = searchInput.fromDate;

        if (searchInput.status === "All") {
            const invoiceDateAll = await invoiceRepo.getInvoiceDateAll(toDate, fromDate);
            for (let invoice of invoiceDateAll) {
                invoice.balance = await invoiceRepo.getInvoiceBalance(invoice.InvoiceNo)
                if (invoice.balance.length == 0) {
                    invoice.balance = invoice.Amount
                } else {
                    invoice.balance = invoice.balance[0].balance
                }
            }
            showInvoiceReport(invoiceDateAll);
        } else {
            let invoiceDate = await invoiceRepo.getInvoiceDate(searchInput.status, toDate, fromDate);
            console.log("<<<<<<<<", invoiceDate)
            const invoiceDate2 = invoiceDate.map(inv => inv.invoice)
            let i=0
            for (let invoice of invoiceDate2) {
                invoice.balance = invoiceDate[i].balance
                i++
            }

        showInvoiceReport(invoiceDate2);
    }

    }