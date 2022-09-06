import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private loginService: LoginService, private router: Router) {}
  public user: any = [];
  email: any;
  password: any;

  async submit() {
    if (this.email == undefined && this.password == undefined) {
      alert('Please enter email or password!');
    } else {
      this.loginService.getuser(this.email, this.password).subscribe((data) => {
        this.user = data;

        if (this.user) {
          alert('logging done successfully');
          this.router.navigateByUrl('customers');
        } else {
          alert('Wrong email or password! \nPlease try again');
        }
      });
    }
  }
}
