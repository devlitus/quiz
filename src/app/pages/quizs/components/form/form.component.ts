import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { FileHandle } from 'src/app/direcives/dnd.directive';
import { CloudinaryService } from 'src/app/services/cloudinary/cloudinary.service';
import { Quiz } from '../../../../models/quiz-model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Output() sendForm = new EventEmitter<Quiz>();
  @ViewChild('titleQ') titelQ!: NgForm;
  @ViewChild('quiz') quiz!: NgForm;
  public titel: string = '';
  public quizForm = new FormGroup({
    // titleQuiz: new FormControl('', Validators.required),
    question: new FormControl('', Validators.required),
    file: new FormControl(''),
    response1: new FormControl('', Validators.required),
    response2: new FormControl('', Validators.required),
    response3: new FormControl('', Validators.required),
    response4: new FormControl('', Validators.required),
    respons: new FormControl(''),
    
  });
  files!: FileHandle;
  public urlImage: string = '';

  constructor(private cld: CloudinaryService) {}

  ngOnInit(): void {}
  filesDropped(files: FileHandle): void {
    this.files = files;
    this.cld.uploadImage(this.files.file)
    .subscribe(image => this.urlImage = image);
  }

  onSubmit() {
    if (this.quizForm.valid) {
      if (this.files) {
        const formWithImage = {
          ...this.quizForm.value,
          ...this.titelQ.value,
          file: this.urlImage,
        };
         this.sendForm.emit(formWithImage);
         this.files.url = ''
         this.quiz.resetForm();
         return
      }
      this.sendForm.emit({...this.quizForm.value, ...this.titelQ.value});
      this.quiz.resetForm()
    }
  }
}
