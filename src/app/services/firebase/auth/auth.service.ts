import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { User } from 'src/app/models/user-model';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSession: User = { displayName: '', email: '', authId: '' };
  constructor(
    private auth: AngularFireAuth,
    private fb: AngularFirestore,
    private router: Router
  ) {}

  get sessionUser() {
    return { ...this.userSession };
  }
  async signUp(
    email: string,
    psw: string,
    username: string
  ): Promise<firebase.auth.UserCredential> {
    const session = await this.auth.createUserWithEmailAndPassword(email, psw);
    await session.user?.updateProfile({ displayName: username });
    this.userSession = {
      displayName: session.user?.displayName || '',
      email: session.user?.email || '',
      authId: session.user?.uid,
    };
    await this.fb
      .collection('users')
      .doc(this.userSession.authId)
      .set(this.userSession);
    localStorage.setItem(
      'user',
      JSON.stringify({
        displayName: this.userSession.displayName,
        authId: this.userSession.authId,
      })
    );
    this.router.navigate(['']);
    return session;
  }
  async signIn(email: string, psw: string) {
    return await this.auth
      .signInWithEmailAndPassword(email, psw)
      .then((user) => {
        this.userSession = {
          displayName: user.user?.displayName || '',
          email: user.user?.email || '',
          authId: user.user?.uid,
        };
        localStorage.setItem(
          'user',
          JSON.stringify({
            displayName: this.userSession.displayName,
            authId: this.userSession.authId,
          })
        );
        this.router.navigate(['']);
      })
      .catch((err) => {
        this.catchErrorLogin(err);
      });
  }
  async signInGoogle(): Promise<firebase.auth.UserCredential> {
    const user = await this.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
    this.userSession = {
      displayName: user.user?.displayName || '',
      email: user.user?.email || '',
      authId: user.user?.uid,
    };
    await this.fb
      .collection('users')
      .doc(this.userSession.authId)
      .set(this.userSession);
    localStorage.setItem(
      'user',
      JSON.stringify({
        displayName: this.userSession.displayName,
        authId: this.userSession.authId,
      })
    );
    this.router.navigate(['']);
    return user;
  }
  async singOut(): Promise<void> {
    localStorage.clear();
    return await this.auth.signOut();
  }
  catchErrorLogin(error: any) {
    switch (error.code) {
      case 'auth/too-many-requests':
        Swal.fire('Error!', 'Contresenya o email no vàlids', 'error');
        break;
      case 'auth/user-not-found':
        Swal.fire('Error!', 'Contresenya o email no vàlids', 'error');
        break;
      case 'auth/wrong-password':
        Swal.fire('Error!', 'Contresenya o email no vàlids', 'error');
        break;
      default:
        break;
    }
  }
}
