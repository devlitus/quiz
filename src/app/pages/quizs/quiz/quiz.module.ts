import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizRoutingModule } from './quiz-routing.module';
import { QuizComponent } from './quiz.component';
import { HeaderModule } from 'src/app/shares/header/header.module';
import { MaterialModule } from 'src/app/theme/material.module';
import { FormQuizModule } from '../form-quiz/form-quiz.module';


@NgModule({
  declarations: [
    QuizComponent
  ],
  imports: [
    CommonModule,
    QuizRoutingModule,
    HeaderModule,
    MaterialModule,
    FormQuizModule,
  ],
  exports: [
    QuizComponent
  ]
})
export class QuizModule { }
