import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HeaderModule } from '../shares/header/header.module';
import { QuizModule } from './quizs/quiz/quiz.module';
import { PagesComponent } from './pages.component';

@NgModule({
  declarations: [
    PagesComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    HeaderModule,
    QuizModule
  ],
  exports: [PagesComponent]
})
export class PagesModule { }
