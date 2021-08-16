import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormQuizComponent } from '../form-quiz/form-quiz.component';
import { QuizComponent } from './quiz.component';

const routes: Routes = [
  {
    path: '',
    component: QuizComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizRoutingModule {}
