import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { StudentsService } from '../dashboard/pages/students/students.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
    {
      provide: StudentsService,
    },
  ],
})
export class CoreModule {}
