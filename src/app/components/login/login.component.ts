import { Component } from '@angular/core';
import { AuthService } from '../../common/service/auth.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule, ReactiveFormsModule],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../common/css/bootstrap.min.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  ngOnInit(): void {
    if (this.authService.getToken() != '' &&  this.authService.getToken() != null) {
      // Redirect to the home page after successful login
      this.router.navigate(['/home']);
    }
  }
  onSubmit() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      // Simulate a login API call
      // In a real scenario, you would call an authentication service here
      this.authService.login(loginData);
      console.log(this.authService.getToken())
      if (this.authService.getToken() != '' &&  this.authService.getToken() != null) {
        // Redirect to the home page after successful login
        this.router.navigate(['/home']);
      }
    }
  }
  userLogin: string = ""
  userPassword: string = ""
  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
}
