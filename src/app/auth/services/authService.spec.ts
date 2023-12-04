import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './auth.service';
import { users } from 'src/app/dashboard/pages/users/models';
import { environment } from 'src/enviroments/enviroments.local';
import { MockProvider } from 'ng-mocks';
import { Router } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { appReducer } from 'src/app/store';

describe('AuthService', () => {
  let authService: AuthService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, StoreModule.forRoot(appReducer, {})],
      providers: [MockProvider(Router)],
    });

    authService = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('Authservice should be defined', () => {
    expect(authService).toBeTruthy();
  });

  it('AuthService should set an authenticated user to login', () => {
    const userMock: users = {
      id: 1,
      email: 'admin@nuremberg.com',
      password: '1234',
      token: 'chiquiaskds',
      name: 'prueba',
      lastname: 'admin',
      role: 'Admin'
    };
    authService.login({
      email: userMock.email,
      password: userMock.password,
    });

    httpController
      .expectOne({
        method: 'GET',
        url: `${environment.baseUrl}/users?email=${userMock.email}&password=${userMock.password}`,
      })
      .flush([userMock]);

    authService.authUser$.subscribe({
      next: (authUser) => {
        expect(authUser).toBeTruthy();
        expect(authUser).toEqual(userMock);
      },
    });
  });
});
