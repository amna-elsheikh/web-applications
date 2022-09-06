import { Customer } from './../../ts/customers';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { InvoicesService } from 'src/app/service/invoices.service';
import { CustomersService } from 'src/app/service/customers.service';
@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.css'],
})
export class InvoiceFormComponent {
  constructor(
    private _invoiceService: InvoicesService,
    private router: Router,
    private routerid: ActivatedRoute,
    private _customerService: CustomersService,
    private fb: FormBuilder
  ) {}
  button = 'add';
  title = 'Add a new invoice';
  public customers: any = [];
  invoiceForm = new FormGroup({
    InvoiceNo: new FormControl(''),
    CustomerID: new FormControl(''),

    // CustomerID: new FormGroup({
    //   customerId: new FormControl(''),
    // }),
    Amount: new FormControl(''),
    InvoiceDate: new FormControl(''),
    DueDate: new FormControl(''),
  });

  ngOnInit() {
    this._customerService.getCustomers().subscribe((data: any) => {
      this.customers = data;
    });

    this._invoiceService
      .getInvoiceById(this.routerid.snapshot.params['id'])
      .subscribe((result: any) => {
        // console.log(result)
        // this.invoiceForm.patchValue(result);
        this.invoiceForm = new FormGroup({
          InvoiceNo: new FormControl(result['InvoiceNo']),
          CustomerID: new FormControl(result['CustomerID']),
          // CustomerID: new FormGroup({
          //   customerId: new FormControl(result['customerId']),
          // }),
          // customerName: new FormControl(result['customerName']) ,
          Amount: new FormControl(result['Amount']),
          InvoiceDate: new FormControl(this.formatDate(result['InvoiceDate'])),
          DueDate: new FormControl(this.formatDate(result['DueDate'])),
        });
      });
  }

  addInvoice() {
    // this.router.navigateByUrl('invoices/invoice-form');
    this._invoiceService.postInvoices(this.invoiceForm.value).subscribe(() => {
      this.router.navigateByUrl('invoices');
      console.log(this.invoiceForm.value);
    });
  }

  updateInvoice() {
    this.button = 'update';
    this.title = 'update invoice';
    this._invoiceService
      .putInvoice(this.routerid.snapshot.params['id'], this.invoiceForm.value)
      .subscribe(() => {
        this.router.navigateByUrl('invoices');
      });
  }
  submit() {
    if (this.routerid.snapshot.params['id'] == undefined) {
      return this.addInvoice();
    } else {
      return this.updateInvoice();
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
