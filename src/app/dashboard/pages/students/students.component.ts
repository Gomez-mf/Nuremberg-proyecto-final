import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentsDialogComponent } from './components/students-dialog/students-dialog.component';
import { Observable, map } from 'rxjs';
import { Student } from './models';
import { StudentsService } from './students.service';
import { Store } from '@ngrx/store';
import { selectAuthUser } from 'src/app/store/auth/auth.selectors';
import swal from 'sweetalert2';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent {
  students$: Observable<Student[]>;
  userRole$: Observable<'Admin' | 'Student' | undefined>;

  constructor(
    private matDialog: MatDialog,
    private studentsService: StudentsService,
    private store: Store
  ) {
    this.students$ = this.studentsService.getStudents();
    this.userRole$ = this.store
      .select(selectAuthUser)
      .pipe(map((u) => u?.role));
  }

  addStudent(): void {
    this.matDialog
      .open(StudentsDialogComponent)
      .afterClosed()
      .subscribe({
        next: (v) => {
          if (!!v) {
            this.students$ = this.studentsService.createStudent(v);
          }
        },
      });
  }

  onEditStudent(Student: Student): void {
    this.matDialog
      .open(StudentsDialogComponent, {
        data: Student,
      })
      .afterClosed()
      .subscribe({
        next: (v) => {
          if (!!v) {
            swal
              .fire({
                title: '¿Quiere editar este estudiante?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, editar',
              })
              .then((result) => {
                if (result.isConfirmed) {
                  this.students$ = this.studentsService.updateStudent(
                    Student.id,
                    v
                  );
                  swal.fire({
                    title: 'Estudiante editado!',
                    icon: 'success',
                  });
                }
              });
          }
        },
      });
  }

  onDeleteStudent(studentId: number): void {
    swal
      .fire({
        title: '¿Eliminar estudiante?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, Eliminar',
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.students$ = this.studentsService.deleteStudent(studentId);
          swal.fire({
            title: 'Estudiante Eliminado!',
            icon: 'success',
          });
        }
      });
  }
}
