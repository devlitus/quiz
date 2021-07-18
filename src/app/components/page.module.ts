import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageRoutingModule } from './page-routing.module';
import { SharedModule } from './../shared/shared.module';

import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CreateQuizComponent } from './create-quiz/create-quiz.component';

import { PageComponent } from './page.component';




@NgModule({
  declarations: [
    PageComponent,
    CreateQuizComponent,
    PageNotFoundComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    PageRoutingModule,
    SharedModule
  ],
})
export class PageModule { }
