import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { PaymentService } from 'src/app/service/payment.service';
import { ServiceService } from 'src/app/service/service.service';
import { InvoicesService } from 'src/app/service/invoices.service';
@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css'],
})
export class PaymentFormComponent {
  replytype: any;
  constructor(
    private _paymentService: PaymentService,
    private router: Router,
    private routerid: ActivatedRoute,
    private Service: ServiceService,
    private fb: FormBuilder,
    private _invoiceService: InvoicesService
  ) {}
  button = 'add';
  title = 'Add a new payment';
  modes: any = [];
  payments: any = [];
  bank: any = [];
  Invoice: any = [];
  paymentForm = new FormGroup({
    paymentId: new FormControl(''),
    // InvoiceNo: new FormControl(this.routerid.snapshot.params['invoiceNo']),
    InvoiceID: new FormControl(''),
    Amount: new FormControl(''),
    PaymentDate: new FormControl(''),
    PaymentMode: new FormControl(''),
    // ChequeId: new FormGroup({
    //   ChequeNo: new FormControl(''),
    //   drawer: new FormControl(''),
    // status: new FormControl(''),
    // receivedDate: new FormControl(''),
    // DueDate: new FormControl(''),
    // chequeImageUri: new FormControl(''),
    // }),
  });

  ngOnInit() {
    this.Service.getModes().subscribe((data) => (this.modes = data));
    this.Service.getBank().subscribe((data) => (this.bank = data));

    this._invoiceService.getInvoices().subscribe((data) => { this.Invoice = data });


    const id = this.routerid.snapshot.params['id'];
    if (id) {
      this._paymentService.getpaymentById(id).subscribe((result: any) => {
        // this.paymentForm.patchValue(result);
        // console.log(result)
        this.paymentForm = new FormGroup({
          paymentId: new FormControl(result['paymentId']),
          InvoiceID: new FormControl(result['InvoiceNo']),
          Amount: new FormControl(result['Amount']),
          PaymentDate: new FormControl(this.formatDate(result['PaymentDate'])),
          PaymentMode: new FormControl(result['PaymentMode']),
          // ChequeId:new FormGroup({
          //   ChequeNo: new FormControl(result['ChequeNo']) ,
          //   drawer: new FormControl(result['drawer']),
          //   status: new FormControl(result['status']) ,
          //   receivedDate: new FormControl(this.formatDate(result['receivedDate'])) ,
          //   DueDate: new FormControl(this.formatDate(result['DueDate'])),
          //   chequeImageUri: new FormControl(result['chequeImageUri']),

          // })
        });
        this.payments = result;
      });
    }
  }

  selectedType = 'Cheque';
  onChange(event: any) {
    this.selectedType = event.target.value;
  }
  addpayment() {
    this.router.navigateByUrl(
      'payments/invoice/' +
        this.routerid.snapshot.params['invoiceNo'] +
        '/payment-form'
    );
    this._paymentService.postpayments(this.paymentForm.value).subscribe(() => {
      this.router.navigateByUrl(
        'payments/invoice/' + this.routerid.snapshot.params['invoiceNo']
      );
    });
    console.log(this.paymentForm.value);
  }

  updatepayment() {
    this.button = 'update';
    this.title = 'update invoice';
    this._paymentService
      .putpayment(this.routerid.snapshot.params['id'], this.paymentForm.value)
      .subscribe(() => {
        this.router.navigateByUrl(
          'payments/invoice/' + this.routerid.snapshot.params['invoiceNo']
        );
      });
  }
  closeForm() {
    return this.router.navigateByUrl(
      'payments/invoice/' + this.routerid.snapshot.params['invoiceNo']
    );
  }
  submit() {
    if (this.routerid.snapshot.params['id'] == undefined) {
      return this.addpayment();
    } else {
      return this.updatepayment();
    }
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
}
