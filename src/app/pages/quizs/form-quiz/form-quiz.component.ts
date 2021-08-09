import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FileHandle } from 'src/app/direcives/dnd.directive';
import { User } from 'src/app/models/user-model';
import { QuizService } from 'src/app/services/firebase/quiz/quiz.service';
import { UserService } from 'src/app/services/firebase/user/user.service';

@Component({
  selector: 'app-form-quiz',
  templateUrl: './form-quiz.component.html',
  styleUrls: ['./form-quiz.component.scss']
})
export class FormQuizComponent implements OnInit {

  public users: User[] = [];
  public quizs: any[] = [];
  private username: string = '';
  quizForm = new FormGroup({
    question: new FormControl('' /*Validators.required*/),
    titleQuiz: new FormControl('' /* Validators.required*/),
    file: new FormControl(''),
    response1: new FormControl('' /*Validators.required*/),
    response2: new FormControl('' /* Validators.required*/),
    response3: new FormControl('' /* Validators.required*/),
    response4: new FormControl('' /* Validators.required*/),
    respons: new FormControl(''),
  });
  files: FileHandle[] = [];
  constructor(private userSr: UserService, private quizSr: QuizService) {}
  ngOnInit(): void {
    this.getUser();
    this.getQuiz();
  }

  filesDropped(files: FileHandle[]): void {
    // console.log(files);
    this.files = files;
  }
  getUser() {
    this.userSr.getUser().subscribe((resp: User[]) => {
      this.users = [...resp];
      this.users.forEach((us: User) => {
        return (this.username = us.displayName);
      });
    });
  }
  getQuiz() {
    /* this.quizSr.getQuiz().subscribe((resp) => {
      this.quizs = [...resp];
    }); */
  }
  onSubmit() {
    if (this.quizForm.valid) {
      if(this.files.length) {
        const newForm = {...this.quizForm.value, file: this.files[0].file.name};
        this.quizSr.addQuiz(newForm);
      }else {
        this.quizSr.addQuiz(this.quizForm.value);
      }
    } else {
      console.log('formulario invalido');
    }
  }

}
