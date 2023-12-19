import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MenuComponent } from './common/components/menu.component';
import { LoginComponent } from "./components/login/login.component";
import { AuthService } from './common/service/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  providers:[AuthService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [CommonModule, RouterOutlet, RouterModule, MenuComponent, LoginComponent, HttpClientModule]
})
export class AppComponent {
  constructor(private authService: AuthService) {}

  isLoggedIn(): boolean {
    console.log(this.authService.isLoggedIn())
    return this.authService.isLoggedIn();
  }
}
