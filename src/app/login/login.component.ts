import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

class RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  password: string;
  passwordC: string;
  constructor() {}
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  registerFormModel = new RegisterForm();
  destroyer$ = new Subject<boolean>();
  registrationResult: string;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.destroyer$.next(false);
    return;
  }

  onSubmitRegisterForm(registerForm: NgForm): void {
    console.log(registerForm);
    if (registerForm.valid) {
      const registrationData = registerForm.value;
      delete registrationData.passwordC;
      this.authService
        .register(registrationData)
        .pipe(takeUntil(this.destroyer$))
        .subscribe(
          (res: { message: string }) => {
            this.registrationResult = res.message;
            registerForm.reset();
          },
          (err) => {
            this.registrationResult = err;
          }
        );
    }
  }
  onLoginFormSubmit(loginForm: NgForm): void {
    if (loginForm.valid) {
      const loginData: { email: string; password: string } = loginForm.value;
      this.authService.login(loginData.email, loginData.password);
    }
  }
  ngOnDestroy(): void {
    this.destroyer$.next(true);
  }
}
