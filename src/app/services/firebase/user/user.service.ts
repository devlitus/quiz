import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fb: AngularFirestore,) { }
  getUser(): Observable<any> {
    return this.fb
      .collection('users', (ref) =>
        ref.where('username', '==', 'carles'/*this.storageUser.username*/)
      )
      .valueChanges()
      .pipe(
        map((user: any) => {
          return user;
        })
      );
  }
}
