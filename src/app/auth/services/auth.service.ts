import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { users } from 'src/app/dashboard/pages/users/models';
import { environment } from 'src/enviroments/enviroments.local';
import { LoginPayload } from '../models';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { authActions } from 'src/app/store/auth/auth.actions';
import { selectAuthUser } from 'src/app/store/auth/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public authUser$ = this.store.select(selectAuthUser);

  private handleAuthUser(authUser: users): void {
    this.store.dispatch(authActions.setAuthUsers({ data: authUser }));
    localStorage.setItem('token', authUser.token);
  }
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private store: Store
  ) {}

  login(paylod: LoginPayload): void {
    this.httpClient
      .get<users[]>(
        `${environment.baseUrl}/users?email=${paylod.email}&password=${paylod.password}`
      )
      .subscribe({
        next: (r) => {
          if (!r.length) {
            swal.fire('Usuario o contraseña inválidos');
          } else {
            const authUser = r[0];
            this.handleAuthUser(authUser);
            this.router.navigate(['/dashboard/home']);
          }
        },
        error: (err) => {
          alert('Error de conexion');
        },
      });
  }

  verifyToken(): Observable<boolean> {
    return this.httpClient
      .get<users[]>(
        `${environment.baseUrl}/users?token=${localStorage.getItem('token')}`
      )
      .pipe(
        map((users) => {
          if (!users.length) {
            return false;
          } else {
            const authUser = users[0];
            this.handleAuthUser(authUser);
            return true;
          }
        })
      );
  }

  logout(): void {
    swal
    .fire({
      title: '¿Está seguro que quierar cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
    })
    .then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch(authActions.resetState());
        localStorage.removeItem('token');
        this.router.navigate(['/auth/login']);
      }
    });
  }
}
