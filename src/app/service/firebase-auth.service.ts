import { Utils } from './../utils/utils';
import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthService {
  constructor(private auth: AngularFireAuth, private utils: Utils) {}

  signUp(email: string, psw: string) {
    // this.fb.collection('users').add({ email, username });
    return this.auth.createUserWithEmailAndPassword(email, psw);
  }
  signIn(email: string, psw: string): Promise<firebase.auth.UserCredential> {
    return this.auth.signInWithEmailAndPassword(email, psw);
  }
  signInGoogle(): Promise<firebase.auth.UserCredential> {
    const user = this.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
    user.then((user) => {
      const userLocal = {
        username: user.user?.email,
        email: user.user?.displayName,
      };
       this.utils.setLocalStorage(userLocal);
      /*this.setUser({
        username: user.user?.displayName,
        email: user.user?.email,
      }); */
    });
    return user;
  }
  singOut(): Promise<void> {
    return this.auth.signOut();
  }
}
