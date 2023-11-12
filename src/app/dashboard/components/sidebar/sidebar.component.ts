import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { users } from '../../pages/users/models';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  public authUser$: Observable<users | null>
  
  constructor(private authService: AuthService){
    this.authUser$ = this.authService.authUser$
  }
}
