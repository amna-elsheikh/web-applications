import { cheque } from './../ts/cheque';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class chequeService {

  public urlUser: string = "http://localhost:9909/api/cheques";
  public url: string = "http://localhost:9909/api/cheque";
  public url2: string = "http://localhost:9909/api/cheques/sum";

constructor(private http: HttpClient) { }

getCheque(): Observable<cheque> {
    return this.http.get<cheque>(this.urlUser);
  }
  postCheque(data: any){
    return this.http.post(this.urlUser,data);
  }
  deleteCheque(_chequeid: any){
    return this.http.delete(this.url+'/'+_chequeid)

  }
  putCheque(_chequeid: any,data: any){

    return this.http.put(this.urlUser,data)

  }
  getChequeById(_chequeid: any){

    return this.http.get(this.url+'/'+_chequeid)

  }
  getChequesSum(){

  }

}
