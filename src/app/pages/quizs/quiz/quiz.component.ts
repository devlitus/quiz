import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user-model';

import { QuizService } from 'src/app/services/firebase/quiz/quiz.service';
import { UserService } from 'src/app/services/firebase/user/user.service';
import { Quiz } from '../../../models/quiz-model';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
  public user: User = {authId: '', displayName: '', email: ''};
  public quizs: Quiz[] = [];  
  
  constructor(
    private userSr: UserService,
    private quizSr: QuizService,
    
  ) {
    this.user = this.userSr.sessionUser;
  }

  ngOnInit(): void {
    this.getQuiz();
  }

  
  getQuiz() {
    this.quizSr.getQuiz().subscribe((resp: any) => {
      this.quizs = [...resp];
    });
  }

  itemQuestion(quiz: Quiz){
    console.log(quiz);
  }
  onSubmit(form: Quiz) {
    this.quizSr.addQuiz(form, this.user.authId);
  }
}















/* if (this.quizForm.valid) {
  if (this.files) {
    const newForm = {
      ...this.quizForm.value,
      file: this.urlImage,
    };

    this.quizSr.addQuiz(newForm, this.user.authId);
  } else {
    this.quizSr.addQuiz(this.quizForm.value, this.user.authId);
  }
  this.quizForm.reset({
    titleQuiz: this.quizForm.value.titleQuiz,
    question: ' ',
    file: ' ',
    response1: ' ',
    response2: ' ',
    response3: ' ',
    response4: ' ',
    respons: ' ',
  });
} else {
  console.log('formulario invalido');
}
}
itemQuestion(quiz: Quiz) {
this.isNewForm = true;
this.isUpdateForm = true;
console.log(quiz);
this.urlImage = quiz.file || ''
console.log(this.urlImage);
this.quizForm.setValue({
  titleQuiz: quiz.titleQuiz,
  question: quiz.question,
  file: quiz.file,
  response1: quiz.response1,
  response2: quiz.response2,
  response3: quiz.response3,
  response4: quiz.response4,
  respons: quiz.respons,
});
} */