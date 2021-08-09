import { Utils } from './../utils/utils';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private storageUser = this.utils.getLocalStorage('user');
  constructor(
    private fb: AngularFirestore,
    private storage: AngularFireStorage,
    private utils: Utils
  ) { }
  getUser(): Observable<any> {
    return this.fb
      .collection('users', (ref) =>
        ref.where('username', '==', this.storageUser.username)
      )
      .valueChanges()
      .pipe(
        map((user: any) => {
          return user;
        })
      );
  }

  addQuiz(data: any) {
    try {
      const { file, titleQuiz } = data;
      const username = this.storageUser.username
      if (file) {
        const splitTitle = titleQuiz.split(' ');
        const joiTitle = splitTitle.join('');
        console.log(joiTitle);
        const ref = this.storage.ref(`image-${joiTitle}/${file}`);
        const task = ref.putString(file);
        // console.log(task);
        this.fb.collection('quiz').add({...data, username});
      } else {
        this.fb.collection('quiz').add({...data, username});
      }
    } catch (error) {
      console.log(error);
    }
  }
  getQuiz() {
    return this.fb
      .collection('quiz', (ref) =>
        ref.where('username', '==', this.storageUser.username)
      )
      .valueChanges();
  }

}
