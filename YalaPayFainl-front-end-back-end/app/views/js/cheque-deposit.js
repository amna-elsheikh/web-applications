import paymentRepo from "./repository/payment-repository.js";
import chequeDepositRepo from "./repository/cheque-deposit-repository.js";
import bankRepository from "./repository/bank-repository.js";
import returnReasonsRepository from "./repository/returnReasons-repository.js";

let isEdit = false;
let chequeNos = [];

window.onload = async () => {
    generateAccount()
    await showChequeDepositData();
    await  showBankAccounts();
    await showCounter();
    await showAwaitingCheques();
    window.addToChequeNos = addToChequeNos;
    window.showReasons = showReasons;
    window.deleteDeposit = deleteDeposit;
    window.updateDeposit = updateDeposit;

};

const popupForm = document.querySelector(".popup-form");
const depositTable = document.querySelector(".table");
const searchForm = document.querySelector(".search");
const counter = document.querySelector(".counter");
const accountSelect = document.querySelector("#bank-account-no");
const chequeSelect = document.querySelector(".cheques-select");
const statusSelect = document.querySelector("#deposit-status");
document.querySelector("#deposit-date").value = new Date().toJSON().slice(0,10);
const accountInfo = document.querySelector(".account-info")


popupForm.addEventListener("submit", addDeposit);
statusSelect.addEventListener("change", showReasonSelect);
searchForm.addEventListener("submit", searchDeposits);


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
async function showAwaitingCheques() {
    const cheques = await paymentRepo.getCheques();
    const awaitingCheques = cheques.filter(
        (cheque) => cheque.status == "Awaiting"
    );
    console.log(awaitingCheques);
    const chequeForms = awaitingCheques
        .map((cheque) => chequeToForm(cheque))
        .join("");
    chequeSelect.innerHTML = `${chequeForms}`;
}

async function showCashedCheques(chequeNumbers) {
    const depositedCheques = [];
    for (const chequeNo of chequeNumbers) {
        const cheque = await paymentRepo.getCheque(parseInt(chequeNo));
        depositedCheques.push(cheque);
    }
    const chequeForms = depositedCheques
        .map((c) => chequeToForm(c))
        .join("");
    chequeSelect.innerHTML = `${chequeForms}`;
}

function chequeToForm(cheque) {
    return `
    <div class="cheque-card">
            <p for="chequeNo">Cheque No: ${cheque.ChequeNo}</p>
            <p>Amount: ${cheque.Amount}</p>
            <p>Status : ${cheque.status}</p>
            <p>Due Date : ${formatDate(cheque.DueDate)} <span class="daydiff">(${dateDifference(formatDate(cheque.DueDate))})</span></p>
            <p>Include? </p>
            <input type="checkbox" class="cbox" onclick="addToChequeNos(this,'${cheque.ChequeNo}')">
            <div class="returns"></div>
    </div>
    `;
}

function addToChequeNos(cb, chequeNo) {
    if (cb.checked === true) {
        chequeNos.push(chequeNo);
    }
    else if (cb.checked === false) {
        const index = chequeNos.indexOf(chequeNo);
        if (index > -1) {
            chequeNos.splice(index, 1);
        }
    }
}


function depositToRow(deposit) {
    return `
    <tr class="table-row">
        <td>${deposit.depositId}</td>
        <td>${formatDate(deposit.depositDate)}</td>
        <td>${deposit.bankAccountNo.accountNo } </td>
        <td>${deposit.depositStatus}</td>
        <td>${deposit.chequeNos}</td>
       
              <td class=editing-btns>
            ${deposit.depositStatus === "Deposited" ?
        `<img class="edit-btn" src="img/pen.svg" 
                onclick="updateDeposit('${deposit.depositId}')"/>
            <img class="delete-btn" src="img/trash.svg" 
                onclick="deleteDeposit('${deposit.depositId}')"/>`
        :
        `<img class="edit-btn" src="img/view.svg" 
                onclick="updateDeposit('${deposit.depositId}', true)"/>`
    }
        </td>
        
    </tr>
    `;
}

async function showBankAccounts() {
    const BankAccount = await bankRepository.getBankAccount();
    const accountOptions = BankAccount.map(
        (bankAcc) =>
            `<option value="${bankAcc._id}"> ${bankAcc.bankId.bankName}${bankAcc.accountNo}</option>`
    );
    accountSelect.innerHTML = accountOptions.join(" ");

}

function showDepositStatus(func) {
    if (func == "add") {
        statusSelect.innerHTML = `
        <option value="Deposited">Deposited</option>
    `;
    } else if (func == "update") {
        statusSelect.innerHTML = `
        <option value="Deposited">Deposited</option>
        <option value="Cashed">Cashed</option>
        <option value="Cashed with Returns">Cashed with Returns</option>
        `;
    }
}

async function showChequeDepositData() {
    showDepositStatus("add");
    const deposits = await chequeDepositRepo.getDeposits();
    const depositRows =  deposits
        .map((deposit) => depositToRow(deposit))
        .join(" ");
    depositTable.innerHTML = `
    <tr class="table-headings">
        <th>Deposit ID</th>
        <th>Deposit Date</th>
        <th>Bank Account Number</th>
        <th>Deposit Status</th>
        <th>Cheque Nos</th>
        <th></th>
    </tr>
    ${depositRows}`;
}
function showReasonSelect() {
    const returnArea = document.querySelectorAll(".returns");
    if (statusSelect.value == "Cashed with Returns") {
        [].slice.call(returnArea).forEach(function (area) {
            area.innerHTML = `
            <p>Returned? </p>
            <input class="cbox" type="checkbox" onclick="showReasons(this)">
            `;
        });
    } else {
        [].slice.call(returnArea).forEach(function (area) {
            area.innerHTML = ``;
        });
    }
}

async function showReasons(cb) {
    if (cb.checked) {
        const reasonDiv = document.createElement("div");
        reasonDiv.className = "reasons";
        reasonDiv.innerHTML = `<select id="returnReason" name="returnReason"></select>`;
        cb.insertAdjacentElement("afterend", reasonDiv);
        const reasonSelect = reasonDiv.firstChild;
        console.log(reasonDiv);

        const reasons= await returnReasonsRepository.getReturnReasons();

        const reasonOptions = reasons.map(
            (reason) => `<option value="${reason.returnedReasons}">${reason.returnedReasons}</option>`
        );
        reasonSelect.innerHTML = reasonOptions.join(" ");
    } else {
        cb.nextElementSibling.remove();
    }
}

async function addDeposit(e) {
    console.log("add")
    e.preventDefault();
    const data = formToObject(e.target);
    console.log(data);
    const deposit1 = {
        depositId: parseInt(data.depositId),
        depositDate: data.depositDate,
        bankAccountNo: data.bankAccountNo,
        depositStatus: data.status,
        chequeNos: chequeNos,
    };
    console.log(deposit1)
    for (const chequeNo of chequeNos) {
        const cheque = await paymentRepo.getCheque(parseInt(chequeNo));
        if(data.status == "Cashed with Returns")
            cheque.status = "Returned";
        else
            cheque.status = data.status;
        await paymentRepo.updateCheque(cheque, parseInt(chequeNo));
    }
    if (isEdit) {

        await chequeDepositRepo.updateDeposit(deposit1);
        isEdit = false;
    } else {
        //assign the deposit ID
        let deposits = await chequeDepositRepo.getDeposits()
            deposits= deposits.map(d=>d.depositId);
        console.log(deposits)
        console.log("-----------",deposit1)
        await chequeDepositRepo.addDeposit(deposit1);
    }
    chequeNos = [];
    showDepositStatus("add");
    await showChequeDepositData();
    e.target.reset();
}

async function deleteDeposit(depositId) {
    await chequeDepositRepo.deleteDeposit(parseInt(depositId));
    await showChequeDepositData();
}

async function updateDeposit(depositId,viewMode) {
    showDepositStatus("update");
    const deposit = await chequeDepositRepo.getDeposit(parseInt(depositId));
    console.log("+++",deposit)
    await showCashedCheques(deposit.chequeNos);
    document.querySelector("#depositId").value = deposit.depositId;
    document.querySelector("#deposit-date").value = formatDate(deposit.depositDate);
    document.querySelector("#bank-account-no").value = deposit.bankAccountNo._id ;
    document.querySelector("#deposit-status").value = deposit.depositStatus;
    isEdit = true;
    if (viewMode) {
        const depositForm = document.querySelector('#form');
        Array.from(depositForm.elements).forEach(e => e.disabled = true);
    }
}

async function searchDeposits(e) {
    e.preventDefault();
    const searchInput = formToObject(e.target);
    console.log(searchInput);
    const deposit = await chequeDepositRepo.getDeposit(parseInt(searchInput.depositId));
    console.log(deposit);
    depositTable.innerHTML = `
    <tr class="table-headings">
        <th>Deposit ID</th>
        <th>Deposit Date</th>
        <th>Bank Account Number</th>
        <th>Deposit Status</th>
        <th>Cheque Nos</th>
        <th></th>
    </tr>
    ${depositToRow(deposit)}`;
}

async function showCounter() {
    const deposits = await chequeDepositRepo.getDeposits();
    const depositCount = deposits.length;
    counter.innerHTML = `${depositCount} <span class="counter-desc">Total Cheque Deposits</span>`;
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
function dateDifference(dueDateString) {
    const today = new Date();
    const dueDate = new Date(dueDateString);
    return Math.floor((dueDate - today) / (1000*60*60*24));
}

