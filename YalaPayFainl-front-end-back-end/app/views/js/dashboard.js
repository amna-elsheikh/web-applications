import paymentRepo from "./repository/payment-repository.js";
import invoiceRepo from "./repository/invoice-repository.js";


window.onload = async () => {
    generateAccount();

    await showInvoiceBox();
    await showChequeBox();

};


function generateAccount(){
    const accountInfo = document.querySelector(".account-info")
    const name = sessionStorage.getItem("name");
    accountInfo.innerHTML = `
    <img class="profile-img" src="img/profile.png" alt="" />
          <span class="account-name">
              ${name} 
              <p class="account-loc">Doha, Qatar</p>
          </span>
    `
}

async function showInvoiceBox(){
    //todays date
    const invoiceBox = document.querySelector(".invoices");

    let totalSum = await invoiceRepo.getTotalInvoiceSum()
    totalSum = totalSum[0].sum
    console.log(totalSum)
    const currentDate = new Date();
    const today = currentDate.toJSON().slice(0,10);
    //due in 30 days
    currentDate.setDate(new Date().getDate()+30);
    const afterToday = currentDate.toJSON().slice(0,10);

    //due in more than 30 days
    currentDate.setDate(new Date().getDate());
    const afterMonth = currentDate.toJSON().slice(0,10);
    let total30Sum = await invoiceRepo.get30InvoiceSum(today,afterToday)
        total30Sum = total30Sum[0].sum
    console.log(total30Sum)
    let totalafter30Sum =await invoiceRepo.getAfter30InvoiceSum(afterMonth)
    totalafter30Sum =totalafter30Sum[0].sum
    console.log(totalafter30Sum)
    invoiceBox.innerHTML = `
    <h1 class="dash-title">invoices</h1>
    <div class="card">
        <h3 class="card-title">All</h3>
        <p class="amount green">${totalSum} <span> QR</span></p>
    </div>
    <div class="card">
        <h3 class="card-title">Due within 30 days</h3>
        <p class="amount purple">${total30Sum} <span> QR</span></p>
    </div>
    <div class="card">
        <h3 class="card-title">Due in more than 30 days</h3>
        <p class="amount red">${totalafter30Sum} <span> QR</span></p>
    </div>
    `
}

async function showChequeBox(){
    const chequeBox = document.querySelector(".cheques");
    let awaitingCheques = await paymentRepo.getChequesSum("Awaiting");
    if (awaitingCheques.length >0){
        awaitingCheques =awaitingCheques[0].sum
    }else{
        awaitingCheques = 0
    }
    let depositedCheques = await paymentRepo.getChequesSum("Deposited");
    if (depositedCheques.length >0){
        depositedCheques =depositedCheques[0].sum
    }else{
        depositedCheques=0
    }
    let cashedCheques = await paymentRepo.getChequesSum("Cashed");
    if (cashedCheques.length >0){
        cashedCheques=cashedCheques[0].sum
    }else{
        cashedCheques=0
    }
   let returnedCheques = await paymentRepo.getChequesSum("Returned");
    if (returnedCheques.length>0){
        returnedCheques =returnedCheques[0].sum
    }else{
        returnedCheques=0
    }
    chequeBox.innerHTML = `
    <h1 class="dash-title">Cheques</h1>
            <div class="card">
                <h3 class="card-title">Awaiting</h3>
                <p class="amount yellow">${awaitingCheques} <span> QR</span></p>
            </div>
            <div class="card">
                <h3 class="card-title">Depotised</h3>
                <p class="amount purple">${depositedCheques} <span> QR</span></p>
            </div>
            <div class="card">
                <h3 class="card-title">Cashed</h3>
                <p class="amount green">${cashedCheques} <span> QR</span></p>
            </div>
            <div class="card">
                <h3 class="card-title">Returned</h3>
                <p class="amount red">${returnedCheques} <span> QR</span></p>
            </div>
    `
}

