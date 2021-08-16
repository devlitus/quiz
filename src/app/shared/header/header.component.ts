import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user-model';
import { AuthService } from 'src/app/services/firebase/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public userSession: User = {authId: '', displayName: '', email: ''};
  public login: boolean = false;

  constructor(private route: Router, private fbAuth: AuthService) { }

  ngOnInit(): void {
    this.onLocalstorage();
  }
  onLogin() {
    this.login = true;
    this.route.navigate(['login']);
  }
  onLogout() {
    console.log('object');
    this.login = false
    this.fbAuth.singOut();
    localStorage.clear();
    this.route.navigate(['login']);
  }
  onHome() {
    this.route.navigate(['']);
  }
  onLocalstorage() {
    if(localStorage.getItem('user')) {
      this.login = true
      this.userSession = JSON.parse(localStorage.getItem('user') || '')
    }
  }
}
