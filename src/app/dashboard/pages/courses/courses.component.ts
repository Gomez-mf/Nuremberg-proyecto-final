import { Component } from '@angular/core';
import { coursesService } from './courses.service';
import { Observable, map} from 'rxjs'
import { course } from './models';
import { CoursesDialogComponent } from './components/courses-dialog/courses-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import swal from'sweetalert2';
import { selectAuthUser } from 'src/app/store/auth/auth.selectors';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {
  courses$: Observable<course[]>;
  userRole$: Observable<'Admin' | 'Student' | undefined>

  constructor(private coursesService: coursesService, private matDialog: MatDialog, private store: Store){
    
    this.userRole$ = this.store.select(selectAuthUser).pipe(map((u)=>u?.role))
    this.courses$ = this.coursesService.getCourses()
  

  }

  addCourse(): void{
      this.matDialog.open(CoursesDialogComponent).
      afterClosed()
      .subscribe({
        next: (result)=>{
          if(!!result){
            this.courses$ = this.coursesService.createCourse(result)
          }
        }
      })
  }


  editCourse(course: course): void {
    this.matDialog
      .open(CoursesDialogComponent, {
        data: course,
      })
      .afterClosed()
      .subscribe({
        next: (v) => {
          if (!!v) {
            swal
            .fire({
              title: '¿Quiere editar este curso?',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Sí, editar',
            })
            .then((result) => {
              if (result.isConfirmed) {
                this.courses$ = this.coursesService.updateCourse(course.id, v)
                swal.fire({
                  title: 'Curso editado!',
                  icon: 'success',
                });
              }
            });
          }
        },
      });
  }
  
  deleteCourse(courseId: number): void{
    swal.fire({
      title: "¿Eliminar curso?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, Eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.courses$ = this.coursesService.deleteCourse(courseId)
        swal.fire({
          title: "Curso Eliminado!",
          icon: "success"
        });
      }
    });
  }
}
