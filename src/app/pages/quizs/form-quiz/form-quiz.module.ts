import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormQuizComponent } from './form-quiz.component';
import { MaterialModule } from 'src/app/theme/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DndDirective } from 'src/app/direcives/dnd.directive';
import { HeaderModule } from 'src/app/shares/header/header.module';



@NgModule({
  declarations: [
    FormQuizComponent,
    DndDirective,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    HeaderModule
  ],
  exports: [
    FormQuizComponent
  ]
})
export class FormQuizModule { }
