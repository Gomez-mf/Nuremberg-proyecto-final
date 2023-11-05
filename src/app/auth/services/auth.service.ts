import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { users } from 'src/app/dashboard/pages/users/models';
import { enviroments } from 'src/enviroments/enviroments.local';
import { LoginPayload } from '../models';
import { Router } from '@angular/router';
import swal from'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _authUser$ = new BehaviorSubject<users | null>(null);

  public authUser$ = this._authUser$.asObservable();
  constructor(private httpClient: HttpClient, private router: Router) {}

  login(paylod: LoginPayload): void {
    this.httpClient
      .get<users[]>(
        `${enviroments.baseUrl}/users?email=${paylod.email}&password=${paylod.password}`
      )
      .subscribe({
        next: (r) => {
          if (!r.length) {
            swal.fire('Usuario o contraseña inválidos')
          } else {
            const authUser = r[0];
            this._authUser$.next(authUser);
            localStorage.setItem('token', authUser.token);
            this.router.navigate(['/dashboard/home']);
            console.log('ok');
          }
        },
      });
  }

  verifyToken(): Observable<boolean> {
    return this.httpClient
      .get<users[]>(
        `${enviroments.baseUrl}/users?token=${localStorage.getItem('token')}`
      )
      .pipe(
        map((users) => {
          if (!users.length) {
            return false;
          } else {
            const authUser = users[0];
            this._authUser$.next(authUser);
            localStorage.setItem('token', authUser.token);
            return true;
          }
        })
      );
  }

  logout(): void{
    this._authUser$.next(null);
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }
}
