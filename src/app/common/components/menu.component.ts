import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-menu',
  standalone: true,
  providers: [AuthService],
  imports: [RouterModule, HttpClientModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css', '../css/bootstrap.min.css']
})
export class MenuComponent {
  constructor(private authService: AuthService, private router: Router) { }
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
