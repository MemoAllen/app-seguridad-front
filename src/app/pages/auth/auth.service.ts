import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserResponse } from '@app/shared/models/user.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '@env/environment';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {
    this.checkToken();
  }

  //Metodo para saber si esta logeado
  get isLogged(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  //Metodo para login
  login(authData: User): Observable<UserResponse | void> {
    return this.http.post<UserResponse>(
      `${environment.API_URL}/auth`, authData)
      .pipe(
        map((user: UserResponse) => {
          console.log(user)
          if (user.code == 0) {
            this.saveLocalStorage(user);
            this.loggedIn.next(true);

          }

          return user;
        }),
        catchError((err) => this.handlerError(err))
      );
  }


  // MEtodo para salir de sesion
  logout() {
    localStorage.removeItem('user');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }


  // checa el token
  checkToken() {
    const jsonUser = localStorage.getItem('user');
    if (jsonUser) {
      const user = JSON.parse(jsonUser);
      if (user) {
        const IsExpired = helper.isTokenExpired(user.token);
        if (IsExpired) {
          this.logout();
        } else {
          this.loggedIn.next(true);
        }
      }
    }
  }

  saveLocalStorage(user: UserResponse) {
    const { code, message, ...rest } = user;
    localStorage.setItem('user', JSON.stringify(rest));
  }

  handlerError(error: any): Observable<never> {
    let errorMessage = 'Ocurrio un error';
    if (error) {
      error = `Error:${error.message}`;
    }

    return throwError(errorMessage);
  }
}
