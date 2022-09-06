import { status } from './../../pipes/status.pipe';
import { Component } from '@angular/core';
import { DepositsService } from 'src/app/service/deposits.service';
import { ServiceService } from 'src/app/service/service.service';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { chequeService } from 'src/app/service/cheque.service';

@Component({
  selector: 'app-deposits-form',
  templateUrl: './deposits-form.component.html',
  styleUrls: ['./deposits-form.component.css'],
})
export class DepositsFormComponent {
  constructor(
    private _depositsSitervice: DepositsService,
    private _ServiceSitervice: ServiceService,
    private router: Router,
    private routerid: ActivatedRoute,
    private _chequeService: chequeService,
    private fb: FormBuilder
  ) {}
  public cheques: any = [];
  public deposits: any = [];
  public bankAcounts: any = [];
  public statu: any = ['Deposited', 'Cashed with Returns', 'Returned'];
  date: any = this.dateDifference;
  status: any = 'Awaiting';
  button = 'add';
  title = 'Add a new deposits';

  depositsForm = new FormGroup({
    bankAccountNo: new FormControl(''),
    depositDate: new FormControl(''),
    depositStatus: new FormControl(''),
    chequeNos: this.fb.array([]),
  });
  onchange(a: any) {
    const chequeNos: FormArray = this.depositsForm.get(
      'chequeNos'
    ) as FormArray;
    if (a.target.checked) {
      chequeNos.push(new FormControl(a.target.value));

    }
  }
  ngOnInit(): void {
    this._chequeService
      .getCheque()
      .subscribe((data) => console.log((this.cheques = data)));
    this._ServiceSitervice
      .getBankAcount()
      .subscribe((data) => console.log((this.bankAcounts = data)));
    this._depositsSitervice
      .getDeposits()
      .subscribe((data) => console.log((this.deposits = data)));

    this._depositsSitervice
      .getDepositById(this.routerid.snapshot.params['id'])
      .subscribe((result: any) => {
        this.depositsForm.patchValue(result);
    //     this.depositsForm = new FormGroup({
    //       bankAccountNo: new FormControl(result['bankAccountNo']),
    //       status: new FormControl(result['status']),
    //       depositDate: new FormControl(this.formatDate(result['depositDate'])),
    //       chequeNos:new FormArray(result['chequeNos'])

    //     });
      });

  }
  selectedType = 'Deposited';

  addDeposits() {
    this.router.navigateByUrl('deposits/deposits-form');
    this.depositsForm.value.depositStatus==='Deposited'

    this._depositsSitervice
      .postDeposits(
        this.depositsForm.value)
      .subscribe(() => {
        console.log(this.depositsForm.value.depositStatus);
        this.router.navigateByUrl('deposits');
      });
  }

  updateDeposits() {
    this.button = 'update';
    this.title = 'update deposits';

    this._depositsSitervice
      .putDeposit(this.routerid.snapshot.params['id'], this.depositsForm.value)
      .subscribe(() => {
        this.router.navigateByUrl('deposits');
      });
  }
  submit() {
    if (this.routerid.snapshot.params['id'] == undefined) {
      return this.addDeposits();
    } else {
      return this.updateDeposits();
    }
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

  dateDifference(dueDateString: any) {
    const today: any = new Date();
    const dueDate: any = new Date(dueDateString);
    this.date = Math.floor((dueDate - today) / (1000 * 60 * 60 * 24));
    return this.date;
  }
}
