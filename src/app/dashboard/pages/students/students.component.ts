import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentsDialogComponent } from './components/students-dialog/students-dialog.component';
import { Subscriber } from 'rxjs';
import { Student } from './models';
import { StudentsService } from './students.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],

  
})
export class StudentsComponent {

  students: Student[] = [];
  
  constructor(
    private matDialog: MatDialog,
    private studentsService: StudentsService
  ) {
    this.studentsService.loadStudents()
     this.studentsService.getStudents().subscribe({
      next: (v)=>{
        this.students = v
      }
     })
  }

  openStudentsDialog(): void {
    this.matDialog
      .open(StudentsDialogComponent)
      .afterClosed()
      .subscribe({
        next: (v) => {
          console.log('valor', v);
          if (!!v) {
            this.students = [
              ...this.students,
              {
                ...v,
                id: new Date().getTime(),
              },
            ];
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
            const newStudent = [...this.students];

            const indextToEdit = newStudent.findIndex(
              (s) => s.id === Student.id
            );

            newStudent[indextToEdit] = { ...newStudent[indextToEdit], ...v };

            this.students = [...newStudent];
          }
        },
      });
  }

  onDeleteStudent(studentId: number): void {
    this.students = this.students.filter((s) => s.id !== studentId);
  }
}
