import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private name: string = 'Carles';

  constructor(public fb: AngularFirestore) {}

  getUser() {
    return this.fb
      .collection('users', (ref) => ref.where('username', '==', this.name))
      .valueChanges();
  }
  addQuiz(data: any) {
    this.fb.collection('quiz').add(data);
  }
  getQuiz() {
    return this.fb
      .collection('quiz', (ref) => ref.where('username', '==', this.name))
      .valueChanges();
  }
}
