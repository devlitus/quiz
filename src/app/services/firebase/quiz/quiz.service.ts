import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(
    private fb: AngularFirestore,
    private storage: AngularFireStorage
  ) {}
  addQuiz(data: any) {
    try {
      const { file, titleQuiz } = data;
      const username = localStorage.getItem('user')
      if (file) {
        const splitTitle = titleQuiz.split(' ');
        const joiTitle = splitTitle.join('');
        console.log(joiTitle);
        const ref = this.storage.ref(`image-${joiTitle}/${file}`);
        const task = ref.putString(file);
        // console.log(task);
        this.fb.collection('quiz').add({ ...data, username });
      } else {
        this.fb.collection('quiz').add({ ...data, username });
      }
    } catch (error) {
      console.log(error);
    }
  }
  getQuiz() {
    /* return this.fb
      .collection('quiz', (ref) =>
        ref.where('username', '==', this.storageUser.username)
      )
      .valueChanges(); */
  }
}
