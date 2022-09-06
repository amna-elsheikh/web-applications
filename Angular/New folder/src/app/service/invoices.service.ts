import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Invoice } from '../ts/invoice';

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {

  public urlUser: string = "http://localhost:9909/api/invoices";
  public url: string = "http://localhost:9909/api/invoice";

constructor(private http: HttpClient) { }

getInvoices(): Observable<Invoice> {
    return this.http.get<Invoice>(this.urlUser);
  }
  postInvoices(data: any){
    return this.http.post(this.urlUser,data);
  }
  deleteInvoice(_Invoiceid: any){
    return this.http.delete(this.url+'/'+_Invoiceid)

  }
  putInvoice(_Invoiceid: any,data: any){

    return this.http.put(this.urlUser,data)

  }
  getInvoiceById(_Invoiceid: any){

    return this.http.get(this.url+'/'+_Invoiceid)

  }

}
