import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { selectAuthUser } from 'src/app/store/auth/auth.selectors';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  userRole$: Observable<'Admin' | 'Student' | undefined>


  constructor(private store: Store){
    this.userRole$ = this.store.select(selectAuthUser).pipe(map((u)=>u?.role))
  }
 
  
}
