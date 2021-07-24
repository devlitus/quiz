import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

import { FileHandle } from './../../directive/dnd.directive';
@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.scss']
})
export class CreateQuizComponent implements OnInit {
  quizForm = new FormGroup( {
    question: new FormControl('', Validators.required),
    file: new FormControl(''),
    response1: new FormControl('', Validators.required),
    response2: new FormControl('', Validators.required),
    response3: new FormControl('', Validators.required),
    response4: new FormControl('', Validators.required),
    respons: new FormControl(''),
  });
  files: FileHandle[] = [];
  constructor() { }
  ngOnInit(): void {
  }

  filesDropped(files: FileHandle[]): void {
    console.log(files)
    this.files = files;
  }

  onSubmit(){
    if (this.quizForm.valid) {
      console.log(this.quizForm.value)
    }else {
      console.log('form inalid')
    }
  }
}
