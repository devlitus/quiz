import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizComponent } from './quiz.component';
import { MaterialModule } from 'src/app/theme/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DndDirective } from 'src/app/direcives/dnd.directive';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormComponent } from '../components/form/form.component';

@NgModule({
  declarations: [
    QuizComponent,
    DndDirective,
    FormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    SharedModule
  ],
  exports: [
    QuizComponent
  ]
})
export class QuizModule { }
