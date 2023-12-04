import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { EnrollmentsActions } from '../../store/enrollments.actions';
import { selectCourses, selectStudents } from '../../store/enrollments.selectors';
import { Observable } from 'rxjs';
import { course } from '../../../courses/models';
import { Student } from '../../../students/models';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-enrollments-dialog',
  templateUrl: './enrollments-dialog.component.html',
  styleUrls: ['./enrollments-dialog.component.css']
})
export class EnrollmentsDialogComponent {

  studentIdControl = new FormControl<number | null>(null);
  courseIdControl = new FormControl<number | null>(null);

  enrollmentForm = new FormGroup({
    
    "studentId": this.studentIdControl,
    "courseId": this.courseIdControl,
  })

  courses$: Observable<course[]>
  students$: Observable<Student[]>

  constructor(private store: Store){
    this.store.dispatch(EnrollmentsActions.loadEnrollmentDialogOptions())
    this.courses$ = this.store.select(selectCourses)
    this.students$ = this.store.select(selectStudents)
  }

  onSubmit(): void {
    this.store.dispatch(
      EnrollmentsActions.createEnrollment({
        payload: this.enrollmentForm.getRawValue(),
      })
    );
  }
}
