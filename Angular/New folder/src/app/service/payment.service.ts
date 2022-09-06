import { payment } from './../ts/payment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  public urlUser: string = "http://localhost:9909/api/payments";
  public url: string = "http://localhost:9909/api/payment";
  public urll: string = "http://localhost:9909/api/payments/invoice/";

constructor(private http: HttpClient) { }

getpayments(): Observable<payment> {
    return this.http.get<payment>(this.urlUser);
  }
  postpayments(data: any){
    return this.http.post(this.urlUser,data);
  }
  putpayment(_paymentid: any,data: any){

    return this.http.put(this.urlUser,data)

  }
   deletepayment(_paymentid: any){
    return this.http.delete(this.url+'/'+_paymentid)

  }
  getpaymentById(_paymentid: any){

    return this.http.get(this.url+'/'+_paymentid)

  }
  getPaymentsByInvoiceNo(_invoiceid: any){

    return this.http.get(this.urll+_invoiceid)

  }

}
