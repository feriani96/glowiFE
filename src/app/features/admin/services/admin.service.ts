import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from 'src/app/core/services/storage/user-storage.service';
import { environment } from 'src/environments/environment';

const baseUrl = environment.BASIC_URL;

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  addCategory(categoryDto: any): Observable<any> {
    return this.http.post(`${baseUrl}api/admin/category`, categoryDto, {
      headers: this.createAuthorizationHeader(),
    })
  }

  getAllCategories(): Observable<any> {
    return this.http.get(`${baseUrl}api/admin/categories`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  addProduct(productDto: any): Observable<any> {
    return this.http.post(`${baseUrl}api/admin/products`, productDto, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getAllProducts(): Observable<any> {
    return this.http.get(`${baseUrl}api/admin/products`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getAllProductByName(name:any): Observable<any> {
    return this.http.get(`${baseUrl}api/admin/search/${name}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  deleteProduct(productId: string) {
    return this.http.delete(`${baseUrl}api/admin/product/${productId}`);
  }

  addCoupon(couponDto: any): Observable<any> {
    return this.http.post(`${baseUrl}api/admin/coupons`, couponDto, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getCoupon(): Observable<any> {
    return this.http.get(`${baseUrl}api/admin/coupons`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getPlacedOrders(): Observable<any> {
    return this.http.get(`${baseUrl}api/admin/placedOrders`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  changeOrderStatus(orderId: string, status: string): Observable<any> {
    return this.http.get(`${baseUrl}api/admin/order/${orderId}/${status}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  postFAQ(productId: string, faqDto: any): Observable<any> {
    return this.http.post(`${baseUrl}api/admin/faq/${productId}`, faqDto, {
      headers: this.createAuthorizationHeader(),
    });
  }

  private createAuthorizationHeader(): HttpHeaders {
    const token = UserStorageService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
}
