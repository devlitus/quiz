import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/firebase/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authFb: AuthService
  ) {}

  public formLogin = this.fb.group({
    email: ['carles@gmail.com', Validators.required],
    psw: ['123456', Validators.required],
  });
  ngOnInit(): void {}

  register() {
    this.router.navigate(['register']);
  }

  signInWithGoogle() {
    this.authFb
      .signInGoogle()
      .then((user) => {
        // console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  onSubmit() {
    if (this.formLogin.valid) {
      const { email, psw } = this.formLogin.value;
      this.signInWithEmailAndPassword(email, psw);
    }
  }
  signInWithEmailAndPassword(email: string, psw: string) {
    this.authFb.signIn(email, psw);
  }
}
