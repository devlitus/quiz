import { PageComponent } from './page.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CreateQuizComponent } from './create-quiz/create-quiz.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {path: '', component: PageComponent, children: [
    {path: 'home', component: HomeComponent, data: {title: 'Home'}},
    {path: 'quiz', component: CreateQuizComponent, data: {title: 'newQiz'}},
    {path: '', redirectTo: '/', pathMatch: 'full'},
    {path: '**', component: PageNotFoundComponent},
  ]},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
