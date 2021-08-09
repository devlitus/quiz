import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public login: boolean = false;
  constructor(private route: Router, /*private authFb: FirebaseAuthService*/) {}

  ngOnInit(): void {}
  onLogin() {
    this.route.navigate(['login']);
    this.login = true
  }
  onLogout() {
    this.login = false
    this.route.navigate(['login']);
    // this.authFb.singOut();
  }
  onHome() {
    this.route.navigate(['']);
  }

}
