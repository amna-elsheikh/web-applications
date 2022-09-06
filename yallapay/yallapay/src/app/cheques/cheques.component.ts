import { Component, OnInit } from '@angular/core';
import { chequeService } from 'src/app/service/cheque.service';

@Component({
  selector: 'app-cheques',
  templateUrl: './cheques.component.html',
  styleUrls: ['./cheques.component.css']
})
export class ChequesComponent implements OnInit {


  public cheques :any = [];
  companyName: string ='';
  constructor(private _chequeService :chequeService) {  }
  ngOnInit() {


this._chequeService.getCheque()
.subscribe(data => console.log(this.cheques=data));

}

  deleteCheque(cheques: any){
this._chequeService.deleteCheque(cheques).subscribe(()=>{this.ngOnInit();});

  }
  search(){
    if(this.companyName!=''){
this.cheques=this.cheques.filter((res:any) => {
  return res.companyName.match(this.companyName)}
)
}
else
return this.ngOnInit()

  }
  imageURL: any
  openNewTab(imageURL: any) {
    if(imageURL!=''){
      this.imageURL=true
          window.open('http://localhost:9909/img/cheques/'+imageURL, '_blank');
    }
    else
    this.imageURL=false

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
