import { Component, OnInit, VERSION } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserResponse } from '@app/shared/models/user.interface';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

    hide = true;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  loginForm = this.fb.group({
    username: ['', [Validators.required,Validators.minLength(3),Validators.maxLength(10)]],
    password: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(15)]],
  });

  ngOnInit(): void {}

  onLogin() {
    //Verifica si el form es invalido
    if (this.loginForm.invalid) {
      return;
    }

    // obtener los datos de mi form
    const formValue = this.loginForm.value;
    this.authService.login(formValue).subscribe((user: UserResponse | void) => {
      if (user) {
        if (user.code == 0) {
          this.router.navigate(['/admin']);
        } else {
          //TODO MOSTRAR EL MENSJE DE EROR
          this.snackBar.open(user.message, '', {
            duration: 3 * 1000,
            panelClass: ['error-snackbar'],
          });
        }
      }
    });
  }

  getErrorMessage(field: string): string {
    let message = '';
    var form = this.loginForm.get(field);
    if (form != null) {
      if (form.hasError('required')) {
        message = 'Campo Requerido';
      } else if(form.hasError('maxlength')){
        message = 'El máximo debe ser 10 caracteres';
      }else if (form.hasError('minlength')) {
        message = 'El minimo debe ser 3 caracteres';
      }
    }
    return message;
  }


  getErrorMessagePassword(field: string): string {
    let message = '';
    var form = this.loginForm.get(field);
    if (form != null) {
      if (form.hasError('required')) {
        message = 'Campo Requerido';
      } else if(form.hasError('maxlength')){
        message = 'El máximo debe ser 15 caracteres';
      }else if (form.hasError('minlength')) {
        message = 'El minimo debe ser 3 caracteres';
      }
    }
    return message;
  }

  isValidField(field: string): boolean {
    var form = this.loginForm.get(field);
    let flag = false;

    if (form != null) {
      flag = form.touched || (form.dirty && !form.valid);
    }
    return flag;
  }

  lentrasOnly(event: any): boolean {
    var inp = String.fromCharCode(event.keyCode);
    if (/^[a-zA-Z\-_\s]*$/i.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }


}


