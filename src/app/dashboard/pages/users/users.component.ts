import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; 
import { Observable } from 'rxjs';
import { users } from './models';
import { usersService } from './users.service';
import { usersDialogComponent } from './components/users-dialog/users-dialog.component';
import swal from'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  users$: Observable<users[]>;
  
  constructor(
    private matDialog: MatDialog,
    private usersService: usersService
  ) {
    this.users$ = this.usersService.getUsers();
  }

  addUser(): void {
    this.matDialog
      .open(usersDialogComponent)
      .afterClosed()
      .subscribe({
        next: (v) => {
          if (!!v) {
            this.users$ = this.usersService.createUsers(v)
          }
        },
      });
  }

  onEditUser(user: users): void {
    this.matDialog
      .open(usersDialogComponent, {
        data: user,
      })
      .afterClosed()
      .subscribe({
        next: (v) => {
          if (!!v) {
            swal
            .fire({
              title: '¿Quiere editar este usuario?',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Sí, editar',
            })
            .then((result) => {
              if (result.isConfirmed) {
                this.users$ = this.usersService.updateUsers(user.id, v)
                swal.fire({
                  title: 'Usuario editado!',
                  icon: 'success',
                });
              }
            });
            
          }
        },
      });
  }

  onDeleteUser(userId: number): void{
    swal
    .fire({
      title: '¿Quiere eliminar este usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
    })
    .then((result) => {
      if (result.isConfirmed) {
        this.users$ = this.usersService.deleteUsers(userId)
        swal.fire({
          title: 'Usuario Eliminado!',
          icon: 'success',
        });
      }
    });
    
    
  }
}
