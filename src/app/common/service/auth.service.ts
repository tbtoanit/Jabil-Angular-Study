import { HttpClient, HttpClientJsonpModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient) {
   }

  private apiUrl = 'https://fakestoreapi.com/auth/login';

  getDataLogin(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, credentials);
  }

  private token: string | null = null;

  // Simulate a login API call
  login(loginData:any): void {

    this.getDataLogin(loginData).subscribe(
      (response) => {
        console.log('Login successful:', response.token);
        this.setToken(response.token)
      },
      (error) => {
        console.error('Login failed:', error);
        // Handle errors
      }
    );


  }

  // Lưu token vào localStorage
  private setToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  // Lấy token từ localStorage
  getToken(): string | null {
    // console.log(this.token)
    return localStorage.getItem('token');
  }

  // Kiểm tra trạng thái đăng nhập
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Xóa token khi đăng xuất
  logout(): void {
    this.token = null;
    localStorage.removeItem('token');
  }
}
