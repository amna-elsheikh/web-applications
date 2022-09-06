import paymentRepo from "./repository/payment-repository.js";

window.onload = async () => {
    generateAccount();
    await showChequesData();
    await showCounter();
    window.viewChequeImage = viewChequeImage;
};

const chequeTable = document.querySelector(".table");
const header = document.querySelector(".header");
const reportForm = document.querySelector(".status-report");
const accountInfo = document.querySelector(".account-info")

reportForm.addEventListener("submit", chequeReport);


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

async function showChequesData() {
    const cheques = await paymentRepo.getCheques();
    console.log(cheques);
    const chequesRows = cheques.map((cheque) => chequeToRow(cheque)).join(" ");
    chequeTable.innerHTML = `
    <tr class="table-headings">
        <th>Cheque No</th>
        <th>Amount</th>
        <th>Drawer</th>
        <th>Bank Name</th>
        <th>Status</th>
        <th>Received Date</th>
        <th>Due Date</th>
        <th></th>
    </tr>
    ${chequesRows}`;
}

function chequeToRow(cheque) {
    return `
    <tr class="table-row">
        <td>${cheque.ChequeNo}</td>
        <td>${cheque.Amount}</td>
        <td>${cheque.drawer}</td>
        <td>${cheque.bankId.bankName}</td>
        <td>${cheque.status}</td>
        <td>${formatDate(cheque.receivedDate)}</td>
        <td>${formatDate(cheque.DueDate)}</td>
        <td class=editing-btns>
            <img class="view-btn" src="img/view.svg" onclick="viewChequeImage('${cheque.ChequeNo}')"/>
        </td>
    </tr>
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
function showChequesReport(cheques) {
    const chequesRows = cheques.map((cheque) => chequeToRow(cheque)).join(" ");
    chequeTable.innerHTML = `
    <tr class="table-headings">
        <th>Cheque No</th>
        <th>Amount</th>
        <th>Drawer</th>
        <th>Bank Name</th>
        <th>Status</th>
        <th>Received Date</th>
        <th>Due Date</th>
        <th></th>
    </tr>
    ${chequesRows}`;
}
///
async function chequeReport(e) {
    e.preventDefault();
    const searchInput = formToObject(e.target);
    const toDate = formatDate(searchInput.toDate);
    const fromDate = formatDate(searchInput.fromDate);

    if(searchInput.status ==="All") {
        const chequeDateAll = await paymentRepo.getChequesDateAll(toDate,fromDate);
        showChequesReport(chequeDateAll);
    }
    else{
        const chequeDate = await paymentRepo.getChequesDate(searchInput.status,toDate,fromDate);
        showChequesReport(chequeDate);
    }
}

async function viewChequeImage(chequeNo){
    const cheque = await paymentRepo.getCheque(parseInt(chequeNo));
    const imageURL = cheque.chequeImageUri;
    window.open(`./img/cheques/${imageURL}`, '_blank');
}

async function showCounter() {
    const cheques = await paymentRepo.getCheques();
    const chequesCount = cheques.length;
    let totalChequesSum = await paymentRepo.getTotalChequesSum()
     totalChequesSum = totalChequesSum[0].sum
console.log('totalChequesSum',totalChequesSum)

    header.innerHTML = `
    <h1 class="header-title">Cheques</h1>
    <div class="count-card">
        <div class="icon-bg">
            <img src="img/wallet.svg" alt="" />
        </div>
        <p class="counter">
            ${chequesCount} <span class="counter-desc">Total Cheques </span>
        </p>
        <div class="icon-bg">
            <img src="img/money-bill-1-wave.svg" alt="" />
        </div>
        <p class="counter">
            $ ${totalChequesSum}  <span class="counter-desc">Sum Cheques</span>
        </p>
    </div>
    `;
}
