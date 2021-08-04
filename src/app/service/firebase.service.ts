import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private name: string = 'Carles';
  private formValid = {};
  constructor(
    private fb: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  getUser(): Observable<any> {
    return this.fb
      .collection('users', (ref) => ref.where('username', '==', this.name))
      .valueChanges()
      .pipe(
        map((user: any) => {
          return user;
        })
      );
  }
  addQuiz(data: any, files: any[]) {

    try {
      if (files.length) {
        const { file } = files[0];
        const storageRef = this.storage.ref(`images/${file.name}`);
        const upload = storageRef.put(file).snapshotChanges();
        upload.subscribe(resp => {
         return this.formValid = {...data, file: resp?.ref.fullPath};
        })
        console.log(this.formValid)
      }else {
        this.formValid = {...data}
        console.log(this.formValid)
        console.log('false')
      }
      // console.log(this.formValid);
      // this.fb.collection('quiz').add(data);
    } catch (error) {
      // error = new Error('error en el formulario');
      console.log(error);
    }
  }
  getQuiz() {
    return this.fb
      .collection('quiz', (ref) => ref.where('username', '==', this.name))
      .valueChanges();
  }
}
