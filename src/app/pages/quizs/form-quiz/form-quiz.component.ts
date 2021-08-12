import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FileHandle } from 'src/app/direcives/dnd.directive';
import { QuizService } from 'src/app/services/firebase/quiz/quiz.service';
import { UserService } from 'src/app/services/firebase/user/user.service';
import { Quiz } from '../../../models/quiz-model';

@Component({
  selector: 'app-form-quiz',
  templateUrl: './form-quiz.component.html',
  styleUrls: ['./form-quiz.component.scss'],
})
export class FormQuizComponent implements OnInit {
  public user = this.userSr.sessionUser;
  public quizs: Quiz[] = [];
  public isUpload: boolean = false;
  quizForm = new FormGroup({
    titleQuiz: new FormControl(' ', Validators.required),
    question: new FormControl(' ', Validators.required),
    file: new FormControl(''),
    response1: new FormControl(' ', Validators.required),
    response2: new FormControl(' ', Validators.required),
    response3: new FormControl(' ', Validators.required),
    response4: new FormControl(' ', Validators.required),
    respons: new FormControl(' '),
  });
  files: FileHandle[] = [];

  constructor(private userSr: UserService, private quizSr: QuizService) {
    
  }

  ngOnInit(): void {
    this.getQuiz();
    console.log(this.isUpload);
  }

  filesDropped(files: FileHandle[]): void {
    this.files = files;
  }

  getQuiz() {
    this.quizSr.getQuiz().subscribe((resp: any) => {
      this.quizs = [...resp];
    });
  }
  itemQuestion(quiz: Quiz) {
    console.log(quiz);
    this.isUpload = true;
    console.log(this.isUpload);

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
  }
  onSubmit() {
    if (this.quizForm.valid) {
      if (this.files.length) {
        const newForm = {
          ...this.quizForm.value,
          file: this.files[0].file.name,
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
}
