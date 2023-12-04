import { Component, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Observable } from 'rxjs';
import { users } from '../../pages/users/models';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  @Output ()
  toggleSidenav = new EventEmitter();

  public authUser$: Observable<users | null>
  
  constructor(private authService: AuthService, public dialog: MatDialog,){

    this.authUser$ = this.authService.authUser$

  }

  logout(): void{
    this.authService.logout();
  }

}
