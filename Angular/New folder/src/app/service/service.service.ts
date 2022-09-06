import { modes } from './../ts/mode';
import { reasons } from './../ts/returnReasons';
import { bankAcoount } from './../ts/bankAccount';
import { bank } from './../ts/bank';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {


  public urlbank: string = "http://localhost:9909/api/bank";
  public urlBankAcount: string = "http://localhost:9909/api/BankAccounts";
  public urlModes: string = "http://localhost:9909/api/paymentModes";
  public urlReasons: string = "http://localhost:9909/api/returnReasons";

constructor(private http: HttpClient) { }

getBank(): Observable<bank> {
    return this.http.get<bank>(this.urlbank);
  }
  postBank(data: any){
    return this.http.post(this.urlbank,data);
  }

  /////////////////
  getBankAcount(): Observable<bankAcoount> {
    return this.http.get<bankAcoount>(this.urlBankAcount);
  }
  postBankAcount(data: any){
    return this.http.post(this.urlBankAcount,data);
  }
////////////////////

  getModes(): Observable<modes> {
    return this.http.get<modes>(this.urlModes);
  }
  postModes(data: any){
    return this.http.post(this.urlModes,data);
  }
  //////////////////

  getReasons(): Observable<reasons> {
    return this.http.get<reasons>(this.urlReasons);
  }
  postReasons(data: any){
    return this.http.post(this.urlReasons,data);
  }

}
