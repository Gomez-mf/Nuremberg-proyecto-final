import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map} from 'rxjs'
import { Enrollment } from '../../models';
import { selectEnrollments} from '../../store/enrollments.selectors';
import { EnrollmentsActions } from '../../store/enrollments.actions';
import { selectAuthUser } from 'src/app/store/auth/auth.selectors';
@Component({
  selector: 'app-enrollments-table',
  templateUrl: './enrollments-table.component.html',
  styleUrls: ['./enrollments-table.component.css']
})
export class EnrollmentsTableComponent {
  displayedColumns = ['id', 'course', 'student', 'actions'];

  enrollments$: Observable<Enrollment[]>
  userRole$: Observable<'Admin' | 'Student' | undefined>

  constructor(private store: Store){

    this.enrollments$ = this.store.select(selectEnrollments)
    this.userRole$ = this.store.select(selectAuthUser).pipe(map((u)=>u?.role))


  }

  deleteEnrollment(id: number) {
    this.store.dispatch(EnrollmentsActions.deleteEnrollment({id}))
  }

}
