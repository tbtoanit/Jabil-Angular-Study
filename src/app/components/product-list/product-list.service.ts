import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductListService {

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get('https://fakestoreapi.com/products')
  }
  getProductById(id: string): Observable<any> {
    return this.http.get('https://fakestoreapi.com/products/' + id)
  }


  getCategories(): Observable<string[]> {
    return this.http.get<string[]>('https://fakestoreapi.com/products/categories');
  }

  private apiUrl = 'https://fakestoreapi.com/products';

  addProduct(productData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, productData);
  }

  updateProduct(product: any): Observable<any> {
    const url = `${this.apiUrl}/${product.id}`;
    const formData = new FormData();
    formData.append('title', product.title);
    formData.append('price', product.price);
    formData.append('description', product.description);
    formData.append('image', product.image); // Điều này cần xử lý đặc biệt
    formData.append('category', product.category);

    const headers = new HttpHeaders();
    headers.set('Content-Type', 'multipart/form-data');

    return this.http.put(url, formData, { headers });
  }

  deleteProduct(productId: number): Observable<any> {
    const url = `${this.apiUrl}/${productId}`;
    return this.http.delete(url);
  }
}
