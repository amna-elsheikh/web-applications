
import { Customer } from '../ts/customers';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  public urlUser: string = "http://localhost:9909/api/customers";
  public url: string = "http://localhost:9909/api/customer";

constructor(private http: HttpClient) { }

getCustomers(): Observable<Customer> {
    return this.http.get<Customer>(this.urlUser);
  }
  postCustomers(data: any){
    return this.http.post(this.urlUser,data);
  }
  deleteCustomer(_customerid: any){
    return this.http.delete(this.url+'/'+_customerid)

  }
  putCustomer(_customerid: any,data: any){

    return this.http.put(this.urlUser,data)

  }
  getCustomerById(_customerid: any){

    return this.http.get(this.url+'/'+_customerid)

  }
 
}
