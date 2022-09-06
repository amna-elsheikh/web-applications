import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../service/login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private loginService: LoginService,
    private router: Router,
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean{
console.log(sessionStorage.getItem("user"))
  if (sessionStorage.getItem("user")==null) {
     alert('login ');
    this.router.navigateByUrl('login');
    return false;

  }
  else{
  // alert(' done ');
  return true;

}
    }
}
