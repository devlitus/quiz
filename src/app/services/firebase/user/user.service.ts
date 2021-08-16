import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../../models/user-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSession: User = {authId: '', displayName: '', email: ''}
  constructor(private fb: AngularFirestore,) { }
  get sessionUser(){
    if(localStorage.getItem('user')) {
      this.userSession = JSON.parse(localStorage.getItem('user') || '');
    }
    return this.userSession;
  }

  
  getUser(): Observable<any> {
    return this.fb
      .collection('users', (ref) =>
        ref.where('auhId', '==', this.userSession.authId)
      )
      .valueChanges()
      .pipe(
        map((user: any) => {
          return user;
        })
      );
  }

}
