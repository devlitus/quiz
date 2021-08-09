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
    email: ['', Validators.required],
    psw: ['', Validators.required],
  });
  ngOnInit(): void {}

  register() {
    this.router.navigate(['register']);
  }
  signInWithGoogle() {
    this.authFb.signInGoogle();
  }
  onSubmit() {
    /* if (this.formLogin.valid) {
      const { email, psw } = this.formLogin.value;
      this.authFb
        .signIn(email, psw)
        .then((user) => {
          console.log(user);
          this.router.navigate(['']);
        })
        .catch((err) => console.error(err));
    } */
  }
}
