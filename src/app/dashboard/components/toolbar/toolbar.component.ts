import { Component, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  @Output ()
  toggleSidenav = new EventEmitter();

  constructor(private auuthService: AuthService){}

  logout(): void{
    this.auuthService.logout();
  }
}
