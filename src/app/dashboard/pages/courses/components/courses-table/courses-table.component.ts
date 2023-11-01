import { Component, Input, Output, EventEmitter } from '@angular/core';
import { course } from '../../models'

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

  displayedColumns = ['id', 'name', 'duration', 'price', 'actions']

}
