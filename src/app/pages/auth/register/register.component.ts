import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/firebase/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public formRegister = this.fb.group({
    username: ['carles', Validators.required],
    email: ['carles@gmail.com', Validators.required],
    psw: ['123456', Validators.required],
  });
  constructor(
    private fb: FormBuilder,
    private authFb: AuthService,
    // private alert: Alert,
    private router: Router
  ) {}
  ngOnInit(): void {}

  onSubmit() {
    if (this.formRegister.valid) {
      const { email, psw, username } = this.formRegister.value;
      this.authFb.signUp(email, psw, username);
    }
  }
  /*  erroAlert(error: any) {
    switch (error.code) {
      case 'auth/email-already-in-use':
        this.alert.alertCustom('Error!', error.message, 'error');
        break;
      case 'auth/invalid-email':
        this.alert.alertCustom('Error!', error.message, 'error');
        break;
      case 'auth/weak-password':
        this.alert.alertCustom('Error!', error.message, 'error');
        break;
      default:
        break;
    }
  } */
}
