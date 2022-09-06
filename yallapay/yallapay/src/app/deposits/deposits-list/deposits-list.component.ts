import { Component, OnInit } from '@angular/core';
import { DepositsService } from 'src/app/service/deposits.service';

@Component({
  selector: 'app-deposits-list',
  templateUrl: './deposits-list.component.html',
  styleUrls: ['./deposits-list.component.css']
})
export class DepositsListComponent implements OnInit {


  public deposits :any = [];
  depositId: any;
  constructor(private _deposSitervice :DepositsService) {  }
  ngOnInit() {


this._deposSitervice.getDeposits()
.subscribe(data => console.log(this.deposits=data));

}

  deletedeposit(deposit: any){
this._deposSitervice.deleteDeposit(deposit).subscribe(()=>{this.ngOnInit();});

  }
  search() {
    if (this.depositId != '') {
      this.deposits = this.deposits.filter((res: any) => {
        return res.depositId==this.depositId
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
}
