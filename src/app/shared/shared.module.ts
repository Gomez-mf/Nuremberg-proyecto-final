import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FullnamePipe } from 'src/app/shared/pipes/fullname.pipe';
import { MatTableModule } from '@angular/material/table';
import { FormErrorsPipe } from './pipes/form-errors.pipe';
import { TitleDirective } from './directives/title.directive';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [FullnamePipe, FormErrorsPipe, TitleDirective,],
  imports: [
    CommonModule
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    FullnamePipe,
    MatTableModule,
    FormErrorsPipe,
    TitleDirective,
    MatCardModule,
    MatSelectModule,



  ]
})
export class SharedModule { }
