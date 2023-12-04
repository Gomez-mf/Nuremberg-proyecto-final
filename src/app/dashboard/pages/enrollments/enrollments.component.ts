import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { EnrollmentsActions } from './store/enrollments.actions';
import { MatDialog } from '@angular/material/dialog';
import { EnrollmentsDialogComponent } from './components/enrollments-dialog/enrollments-dialog.component';


@Component({
  selector: 'app-enrollments',
  templateUrl: './enrollments.component.html',
  styleUrls: ['./enrollments.component.css']
})
export class EnrollmentsComponent {
constructor(private store: Store, private dialog: MatDialog){
  this.store.dispatch(EnrollmentsActions.loadEnrollments())
}

addEnrollments(): void {
  this.dialog.open(EnrollmentsDialogComponent)
}

}
