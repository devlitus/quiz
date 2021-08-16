import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FileHandle } from 'src/app/direcives/dnd.directive';
import { ImageCloudinary } from 'src/app/models/imageCloudinary.model';
import { QuizService } from 'src/app/services/firebase/quiz/quiz.service';
import { UserService } from 'src/app/services/firebase/user/user.service';
import { Quiz } from '../../../models/quiz-model';
import { CloudinaryService } from '../../../services/cloudinary/cloudinary.service';

@Component({
  selector: 'app-form-quiz',
  templateUrl: './form-quiz.component.html',
  styleUrls: ['./form-quiz.component.scss'],
})
export class FormQuizComponent implements OnInit {
  public user = this.userSr.sessionUser;
  public quizs: Quiz[] = [];
  public isNewForm: boolean = false;
  public isUpdateForm: boolean = false;
  public urlImage: string = '';
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
  files!: FileHandle;

  constructor(
    private userSr: UserService,
    private quizSr: QuizService,
    private cld: CloudinaryService
  ) {}

  ngOnInit(): void {
    this.getQuiz();
  }

  filesDropped(files: FileHandle): void {
    this.files = files;
    this.cld.uploadImage(this.files.file)
    .subscribe(image => this.urlImage = image);
  }

  getQuiz() {
    this.quizSr.getQuiz().subscribe((resp: any) => {
      this.quizs = [...resp];
    });
  }

  onSubmit() {
    if (this.quizForm.valid) {
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
  }
  uploadForm(event: Event, quiz: FormGroup) {
    event.preventDefault();
    const updateQuiz: Quiz = quiz.value;
    // this.quizSr.updateQuiz(updateQuiz);
    console.log(quiz.value);
  }
}
