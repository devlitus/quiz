import { Router } from '@angular/router';
import { Alert } from './../../utils/utils';
import { FirebaseAuthService } from './../../service/firebase-auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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
    private authFb: FirebaseAuthService,
    private alert: Alert,
    private router: Router
  ) {}
  ngOnInit(): void {}

  onSubmit() {
    if (this.formRegister.valid) {
      const { email, psw, username } = this.formRegister.value;
      this.authFb
        .signUp(email, psw)
        .then((user) => {
          user.user?.updateProfile({
            displayName: username,
          });
          this.alert
            .alertCustom('Correcta', 'Benvingut! al teu kahoot', 'success')
            .then((close) => {
              if (close.value) this.router.navigate(['']);
            });

          console.log(user.user);
        })
        .catch((err) => {
          this.erroAlert(err);
        });
    }
  }
  erroAlert(error: any) {
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
  }
}
