import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentsDialogComponent } from './components/students-dialog/students-dialog.component';
import { Observable } from 'rxjs';
import { Student } from './models';
import { StudentsService } from './students.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],

  
})
export class StudentsComponent {

  students$: Observable<Student[]>;
  
  constructor(
    private matDialog: MatDialog,
    private studentsService: StudentsService
  ) {
    this.students$ = this.studentsService.getStudents();
  }

  addStudent(): void {
    this.matDialog
      .open(StudentsDialogComponent)
      .afterClosed()
      .subscribe({
        next: (v) => {
          if (!!v) {
            this.students$ = this.studentsService.createStudent(v)
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
            this.students$ = this.studentsService.updateStudent(Student.id, v)
          }
        },
      });
  }

  onDeleteStudent(studentId: number): void{
    this.students$ = this.studentsService.deleteStudent(studentId)
  }
}