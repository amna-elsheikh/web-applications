import { CustomersService } from '../../service/customers.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})

export class CustomersComponent  {

  public customers :any = [];
  companyName: string ='';
  constructor(private _customerService :CustomersService) {  }
  ngOnInit() {


this._customerService.getCustomers()
.subscribe(data =>this.customers=data);

}

  deleteCustomer(customer: any){
this._customerService.deleteCustomer(customer).subscribe(()=>{this.ngOnInit();});

  }
  search(){
    if(this.companyName!=''){
this.customers=this.customers.filter((res:any) => {
  return res.companyName.match(this.companyName)}
)
}
else
return this.ngOnInit()

  }
}
