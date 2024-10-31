import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  sectionName = 'login';

  urlLogin = 'http://localhost:8080/user-api/login';
  urlRegister = 'http://localhost:8080/user-api/register';

  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(
    private httpClient: HttpClient,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.registerForm = fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  changeSection(name: any) {
    this.sectionName = name;
    this.registerForm.reset();
    this.loginForm.reset();
  }

  submitLogin() {
    let dataLogin = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
    };

    this.httpClient.post(this.urlLogin, dataLogin).subscribe((result: any) => {
      if (String(result.status) == 'Success') {
        localStorage.setItem('username', dataLogin.username);
        this.router.navigate(['member']);
        
      } else {
        alert(result.message);
      }
    });
  }

  submitRegister() {
    let dataRegister = {
      username: this.registerForm.value.username,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
    };

    let passwordOne = this.registerForm.value.password;
    let passwordTwo = this.registerForm.value.confirmPassword;
    if (passwordOne == passwordTwo) {
      this.httpClient
        .post(this.urlRegister, dataRegister)
        .subscribe((result: any) => {
          alert(result.message);
          if (String(result.status) == 'Success') {
            this.changeSection('login');
          }
        });
    } else {
      alert('Password Tidak Sama');
    }
  }
}
