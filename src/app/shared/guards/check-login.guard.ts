import { Injectable } from '@angular/core';
import {CanActivate, UrlTree } from '@angular/router';
import { AuthService } from '@app/pages/auth/auth.service';
import { Observable } from 'rxjs';
import { take,map } from 'rxjs/operators';

import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CheckLoginGuard implements CanActivate {

  constructor(private authService:AuthService, private router:Router){

  }


  canActivate(): Observable<boolean> {
    return this.authService.isLogged.pipe(
      take(1),
      map((isLogged:boolean) => !isLogged)
    );
  }

}
