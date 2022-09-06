import { Invoice } from './../../ts/invoice';
import { Component, OnInit } from '@angular/core';
import { InvoicesService } from 'src/app/service/invoices.service';
import { PaymentService } from 'src/app/service/payment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css'],
})
export class InvoiceListComponent implements OnInit {
  constructor(
    private _InvoicesService: InvoicesService,
    private _paymentService: PaymentService,
    private router: Router
  ) {}
  public invoices: any = [];
  InvoiceNo: any;
  ngOnInit() {
    this._InvoicesService
      .getInvoices()
      .subscribe((data) => console.log((this.invoices = data)));
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

  deleteInvoice(invoices: any) {
    this._InvoicesService.deleteInvoice(invoices).subscribe(() => {
      this.ngOnInit();
    });
  }

  search() {
    if (this.InvoiceNo != '') {
      this.invoices = this.invoices.filter((res: any) => {
        return res.InvoiceNo==this.InvoiceNo
      }
    )
}
    else return this.ngOnInit();
  }
}
