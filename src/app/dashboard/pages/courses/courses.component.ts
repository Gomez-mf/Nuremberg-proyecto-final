import { Component } from '@angular/core';
import { coursesService } from './coursesService';
import { Observable} from 'rxjs'
import { course } from './models';
import { MatDialog } from '@angular/material/dialog';
import { CoursesDialogComponent } from './components/courses-dialog/courses-dialog.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {
  courses$: Observable<course[]>;

  constructor(private coursesService: coursesService, private matDialog: MatDialog){
    
    this.courses$ = this.coursesService.getCourses$();

  }

  addCourse(): void{
      this.matDialog.open(CoursesDialogComponent).afterClosed().subscribe({
        next: (result)=>{
          if(result){
            this.courses$ = this.coursesService.createCourses$({
              id: new Date().getTime(),
              name: result.name,
              description: result.description,
              duration: result.duration,
              price: result.price
            })
          }
        }
      })
  }

  onDeleteCourse(courseId: number): void{
    this.courses$ = this.coursesService.deleteCourse$(courseId)
  }

  onEditCourse(courseId: number): void{
    this.matDialog.open(CoursesDialogComponent, {
      data: courseId,
    }).afterClosed().subscribe({
      next: (result)=>{
        if(!!result){
          this.courses$ = this.coursesService.editCourse$(courseId, result)
        }
      }
    })
  }
}

