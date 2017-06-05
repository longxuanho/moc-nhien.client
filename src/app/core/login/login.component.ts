import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoggerService } from '../shared/logger.service';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'sk-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  email: FormControl;
  password: FormControl;

  constructor(
    private authService: AuthService,
    private loggerService: LoggerService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.buildForm();
  }

  buildForm() {
    this.email = new FormControl('', Validators.required);
    this.password = new FormControl('', Validators.required);
    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password
    });
  }

  onLogIn(credentials) {
    // this.authService.login(credentials)
    //   .then(() => {
    //     this.router.navigate(['/dashboard']);
    //     this.loggerService.success('Đăng nhập thành công!', 'Welcome back,');
    //   })
    //   .catch((error: Error) => this.loggerService.error(error.message, 'Đăng nhập thất bại!'))
  }

  ngOnInit() { }

}
