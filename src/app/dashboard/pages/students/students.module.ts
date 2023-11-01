import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { apiUrl } from 'src/app/config/url.token';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [
    {provide: apiUrl,
      useValue: {
        url: 'http://http://localhost/3000/students'
      }
    }
  ]
})
export class StudentsModule { }
