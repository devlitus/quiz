import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormQuizComponent } from './form-quiz.component';
import { MaterialModule } from 'src/app/theme/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DndDirective } from 'src/app/direcives/dnd.directive';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    FormQuizComponent,
    DndDirective,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule
  ],
  exports: [
    FormQuizComponent
  ]
})
export class FormQuizModule { }
