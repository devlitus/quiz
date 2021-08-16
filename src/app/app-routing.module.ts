import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { PagesComponent } from './pages/pages.component';
import { FormQuizComponent } from './pages/quizs/form-quiz/form-quiz.component';



const routes: Routes = [
  {path: '', component: PagesComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'quiz', component: FormQuizComponent},
  // {path: '**', component: PageNotFoundComponent},
  {path: '', redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
