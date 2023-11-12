import { TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedModule } from 'src/app/shared/shared.module';

describe('LoginComponent', () => {
  let loginComponent: LoginComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [HttpClientTestingModule, SharedModule],
    });

    loginComponent = TestBed.createComponent(LoginComponent).componentInstance;
  });

  it('should create login component', () => {
    expect(loginComponent).toBeTruthy();
  });

  it('if form is invalid mark fields like touched', () => {
    loginComponent.login();

    expect(loginComponent.emailControl.touched).toBeTrue();
    expect(loginComponent.passwordControl.touched).toBeTrue();
  });
  
  it('if form is invalid call function login', () => {
    loginComponent.loginForm.patchValue({
      email: 'admin@nuremberg.com',
      password: '1234',
    });
    const spyOnAuthServiceLogin = spyOn(
      (loginComponent as any).authService,
      'login'
    );
    loginComponent.login();
    expect(spyOnAuthServiceLogin).toHaveBeenCalled();
  });
});
