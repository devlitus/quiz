import { FirebaseService } from './../../service/firebase.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

import { FileHandle } from './../../directive/dnd.directive';
import { User } from 'src/app/models/user.interface';
import { compileDeclareNgModuleFromMetadata } from '@angular/compiler';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.scss'],
})
export class CreateQuizComponent implements OnInit {
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
  constructor(public service: FirebaseService) {}
  ngOnInit(): void {
    this.getUser();
    this.getQuiz();
  }

  filesDropped(files: FileHandle[]): void {
    // console.log(files);
    this.files = files;
  }
  getUser() {
    this.service.getUser().subscribe((resp: User[]) => {
      this.users = [...resp];
      this.users.forEach((us: User) => {
        return (this.username = us.username);
      });
    });
  }
  getQuiz() {
    this.service.getQuiz().subscribe((resp) => {
      this.quizs = [...resp];
    });
  }
  onSubmit() {
    if (this.quizForm.valid) {
      if(this.files.length) {
        const newForm = {...this.quizForm.value, file: this.files[0].file.name};
        this.service.addQuiz(newForm);
      }else {
        this.service.addQuiz(this.quizForm.value);
      }
    } else {
      console.log('formulario invalido');
    }
  }
}
