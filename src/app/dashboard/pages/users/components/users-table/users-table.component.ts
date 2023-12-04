import { Component, EventEmitter, Input, Output } from '@angular/core';
import { users } from '../../models';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAuthUser } from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
})
export class usersTableComponent {
  displayedColumns = ['id', 'fullname', 'email', 'actions'];

  @Input()
  dataSource: users[] = [];

  @Output()
  deleteUser = new EventEmitter<number>();

  @Output()
  editUser = new EventEmitter<users>();

  

  constructor(private router: Router, private store: Store) {
  
  }

  goToDetail(userId: number): void {
    this.router.navigate(['dashboard', 'users', 'detail', userId]);
  }
}