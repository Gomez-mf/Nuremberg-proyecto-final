import { Component, Input, Output, EventEmitter } from '@angular/core';
import { course } from '../../models';
import { Store } from '@ngrx/store';
import { selectAuthUser } from 'src/app/store/auth/auth.selectors';
import {Observable, map } from 'rxjs';

@Component({
  selector: 'app-courses-table',
  templateUrl: './courses-table.component.html',
  styleUrls: ['./courses-table.component.css']
})
export class CoursesTableComponent {
  @Input()
  dataSource: course[] = [];

  @Output()
  addCourse = new EventEmitter();

  @Output()
  editCourse = new EventEmitter();

  @Output()
  deleteCourse = new EventEmitter();

  displayedColumns = ['id', 'name', 'actions']

  userRole$: Observable<'Admin' | 'Student' | undefined>


  constructor(private store: Store){
    this.userRole$ = this.store.select(selectAuthUser).pipe(map((u)=>u?.role))
  }

}
