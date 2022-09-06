import { deposit } from '../ts/deposit';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { bank } from '../ts/bank';

@Injectable({
  providedIn: 'root'
})
export class DepositsService {

  public urlUser: string = "http://localhost:9909/api/deposits";
  public url: string = "http://localhost:9909/api/deposit";

constructor(private http: HttpClient) { }

getDeposits(): Observable<deposit> {
    return this.http.get<deposit>(this.urlUser);
  }

  postDeposits(data: any){
    return this.http.post(this.urlUser,data);
  }
  deleteDeposit(_depositid: any){
    return this.http.delete(this.url+'/'+_depositid)

  }
  putDeposit(_depositid: any,data: any){

    return this.http.put(this.urlUser,data)

  }
  getDepositById(_depositid: any){

    return this.http.get(this.url+'/'+_depositid)

  }



}
