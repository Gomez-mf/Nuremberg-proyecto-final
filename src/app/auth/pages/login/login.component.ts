import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  emailControl = new FormControl('', [Validators.required, Validators.email])
  passworodControl = new FormControl('', [Validators.required])

loginForm = new FormGroup({
  email:this.emailControl,
  password:this.passworodControl,
})

  constructor(private authService: AuthService, private router: Router){}

  login(): void{

    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched()
    }else{
      console.log(this.loginForm.value);
      this.authService.login(this.loginForm.getRawValue())
    }

  }
}
