import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import { FirebaseService } from './../../service/firebase.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private service: FirebaseService
  ) {}

  public formLogin = this.fb.group({
    email: ['carles@gmail.com'],
    psw: ['123456'],
  });
  ngOnInit(): void {}

  register() {
    this.router.navigate(['register']);
  }
  signInWithGoogle() {
    this.service
      .signInGoogle()
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  }
  onSubmit() {
    if (this.formLogin.valid) {
      const { email, psw } = this.formLogin.value;
      this.service.signIn(email, psw);
    }
  }
}
