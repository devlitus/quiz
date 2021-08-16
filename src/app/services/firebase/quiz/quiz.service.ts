import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { UserService } from '../user/user.service';
import { Quiz } from '../../../models/quiz-model';
import { CloudinaryService } from '../../cloudinary/cloudinary.service';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private fb: AngularFirestore, private user: UserService) {}

  addQuiz(data: Quiz, user: string) {
    try {
      this.fb.collection('quizs').add({ ...data, authId: user });
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
  async updateQuiz(quiz: Quiz) {
    try {
      const { file, titleQuiz, question } = quiz;
      if (file) {
        /* this.fb
          .collection('quizs')
          .add({ ...data, authId: user }); */
      } else {
        /* this.fb
          .collection('quizs')
          .add({ ...data, authId: user }); */
      }
    } catch (error) {
      console.log(error);
    }
  }
}
