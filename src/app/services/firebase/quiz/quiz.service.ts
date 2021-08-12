import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { UserService } from '../user/user.service';
import { Quiz } from '../../../models/quiz-model';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(
    private fb: AngularFirestore,
    private storage: AngularFireStorage,
    private user: UserService
  ) {
    
  }
  addQuiz(data: Quiz, user: string) {
    try {
      const { file, titleQuiz, question } = data;
      if (file) {
        const splitTitle = titleQuiz.split(' ');
        const joinTitle = splitTitle.join('');
        const splitQuestion = question.split(' ');
        const joinQuestion = splitQuestion.join('')
        const ref = this.storage.ref(`image-${joinTitle}/${joinQuestion}-${file}`);
        const task = ref.put(file);
        // console.log(task);
        this.fb
          .collection('quizs')
          .add({ ...data, authId: user });
      } else {
        this.fb
          .collection('quizs')
          .add({ ...data, authId: user });
      }
    } catch (error) {
      console.log(error);
    }
  }
  getQuiz() {
    return this.fb
      .collection('quizs', (ref) =>
        ref.where('authId', '==', this.user.sessionUser.authId)
      )
      .valueChanges();
  }
}
