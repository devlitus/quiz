import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormQuizComponent } from '../form-quiz/form-quiz.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
