import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AduserService } from "../shared/aduser.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private aduserService : AduserService,private router : Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (!this.aduserService.isLoggedIn()) {
        this.router.navigateByUrl('/login');
        this.aduserService.deleteToken();
        return false;
      }
    return true;
  }
}
