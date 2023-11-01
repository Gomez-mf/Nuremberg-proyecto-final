import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Student } from '../../models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-students-table',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.css'],
})
export class StudentsTableComponent {
  displayedColumns = ['id', 'fullname', 'email', 'actions'];

  @Input()
  dataSource: Student[] = [];

  @Output()
  deleteStudent = new EventEmitter<number>();

  @Output()
  editStudent = new EventEmitter<Student>();

  constructor(private router: Router) {}

  goToDetail(studentId: number): void {
    this.router.navigate(['dashboard', 'students', 'detail', studentId]);
  }
}
