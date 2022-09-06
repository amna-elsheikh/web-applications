import { Component } from '@angular/core';
import { CustomersService } from '../../service/customers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl,FormBuilder } from '@angular/forms';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-customers-form',
  templateUrl: './customers-form.component.html',
  styleUrls: ['./customers-form.component.css']
})
export class CustomersFormComponent  {
  constructor(private _customerService :CustomersService,private router: Router,
    private routerid :ActivatedRoute,private fb:FormBuilder) {  }
  button="add"
  title='Add a new customer'
  customerForm = new FormGroup({
    customerId:  new FormControl(''),
    companyName:  new FormControl(''),
    address:this.fb.group({
      street: new FormControl('') ,
      city: new FormControl('') ,
      country: new FormControl(''),
    })
      ,
      contactDetails:this.fb.group({
      firstName: new FormControl('') ,
      lastName: new FormControl('') ,
      email: new FormControl('') ,
      mobile: new FormControl('')
    })

    });


  ngOnInit() {
    this._customerService.getCustomerById(this.routerid.snapshot.params['id']).subscribe(
      (result:any)=> { console.log(result)
      this.customerForm.patchValue(result)
        });

  }


addCustomer()
  {

   this.router.navigateByUrl('customers/customer-form')
   this._customerService.postCustomers(this.customerForm.value).subscribe(
    ()=> {
      this.router.navigateByUrl('customers');

   });
   console.log(this.customerForm.value);


}

updateCustomer(){

  this.button="update"
this.title='update customer'
  this._customerService.putCustomer(this.routerid.snapshot.params['id'],this.customerForm.value).subscribe(
    ()=> {
      this.router.navigateByUrl('customers');
   }
   );

}
submit(){
  if(this.routerid.snapshot.params['id']==undefined)
{
  return this.addCustomer()
}
else{
  return this.updateCustomer()

}
}
}

