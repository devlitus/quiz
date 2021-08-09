import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { User } from 'src/app/models/user-model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public userSession: User = { displayName: '', email: '' };
  constructor(private auth: AngularFireAuth, private fb: AngularFirestore) {}

  async signUp(email: string, psw: string, username: string) {
    const loginEmail = await this.auth.createUserWithEmailAndPassword(
      email,
      psw
    );
    await loginEmail.user?.updateProfile({ displayName: username });
    this.userSession = {
      displayName: loginEmail.user?.displayName || '',
      email: loginEmail.user?.email || '',
    };
    this.fb.collection('users').add(this.userSession);
    console.log(this.userSession);
  }
  async signIn(email: string, psw: string) {
    return await this.auth.signInWithEmailAndPassword(email, psw);
  }
  async signInGoogle(): Promise<firebase.auth.UserCredential> {
    const user = await this.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
    this.userSession = {
      displayName: user.user?.displayName || '',
      email: user.user?.email || '',
    };
    this.fb.collection('users').add(this.userSession);
    return user;
  }
  singOut(): Promise<void> {
    return this.auth.signOut();
  }
}
