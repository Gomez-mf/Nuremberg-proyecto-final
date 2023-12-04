import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Student } from '../../models';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAuthUser } from 'src/app/store/auth/auth.selectors';
import { map, Observable } from 'rxjs';

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

  userRole$: Observable<'Admin' | 'Student' | undefined>
  

  constructor(private router: Router, private store: Store) {
    this.userRole$ = this.store.select(selectAuthUser).pipe(map((u)=>u?.role))
  }

  goToDetail(studentId: number): void {
    this.router.navigate(['dashboard', 'students', 'detail', studentId]);
  }
}
