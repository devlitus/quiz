import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/firebase/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public formRegister!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authFb: AuthService,
  ) {this.initForm()}
  ngOnInit(): void {}

  initForm() {
    this.formRegister = this.fb.group({
      username: ['carles', Validators.required],
      email: ['carles@gmail.com', Validators.required],
      psw: ['123456', Validators.required],
    });
  }

  onSubmit() {
    if (this.formRegister.valid) {
      const { email, psw, username } = this.formRegister.value;
      this.authFb.signUp(email, psw, username).then((user) => {
        // console.log(user);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }
}
