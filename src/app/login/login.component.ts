import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';

class RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
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

  constructor(private authService: AuthService) {
    return;
  }

  ngOnInit(): void {
    return;
  }

  onSubmitRegisterForm(registerForm: NgForm): void {
    console.log(registerForm.value);
  }
}
