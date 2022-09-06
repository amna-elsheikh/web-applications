import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from 'src/app/service/payment.service';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css'],
})
export class PaymentListComponent implements OnInit {
  public payments: any = [];
  paymentId: any;
  constructor(
    private _paymentService: PaymentService,
    private router: Router,
    private routerid: ActivatedRoute) { }
  ngOnInit() {
    if (this.routerid.snapshot.params['invoiceNo'] == undefined) {
      this._paymentService
        .getpayments()
        .subscribe((data) => (console.log(this.payments = data)));
    } else {
      this._paymentService
        .getPaymentsByInvoiceNo(this.routerid.snapshot.params['invoiceNo'])
        .subscribe((data) => (console.log(this.payments = data)));
    }
  }

  deletepayment(payments: any) {
    this._paymentService.deletepayment(payments).subscribe(() => {
      this.ngOnInit();
    });
  }

  search() {
    if (this.paymentId != '') {
      this.payments = this.payments.filter((res: any) => {
        return res.paymentId == this.paymentId

      }
      )
    }
    else return this.ngOnInit();
  }
  formatDate(date: any) {
    date = new Date(date);
    let m = date.getMonth() + 1;
    if (m < 10) {
      m = '0' + m;
    }
    let d = date.getDate();
    if (d < 10) {
      d = '0' + d;
    }
    return date.getFullYear() + '-' + m + '-' + d;
  }
  openNewTab(imageURL: string) {
    if (imageURL != '') {

      window.open('http://localhost:9909/img/cheques/' + imageURL, '_blank');
    }
  }
  paymentForm() {

    return this.router.navigateByUrl('payments/invoice/' + this.routerid.snapshot.params['invoiceNo'] + '/payment-form');

  }
  cheque(chequeId: any) {
    if (chequeId != undefined) {

      return chequeId.ChequeNo
    }
    else
      return ''
  }
}
