import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UserStorageService } from '../storage/user-storage.service';
import { environment } from 'src/environments/environment';

const baseUrl = environment.BASIC_URL;

// Constantes pour les rôles
const ROLES = {
  CUSTOMER: 'CUSTOMER',
  VISITOR: 'VISITOR'
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.BASIC_URL;

  constructor(private http: HttpClient, private userStorageService: UserStorageService) { }

  register(signupRequest: any): Observable<any> {
    return this.http.post(`${this.baseUrl}sign-up`, signupRequest);
  }

  login(email: string, password: string): any {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = { email, password };

    return this.http.post(`${this.baseUrl}authenticate`, body, { headers, observe: 'response' }).pipe(
      map((res: any) => {
        console.log(res);

        const token = res.body?.jwt;
        const user = {
          userId: res.body?.userId,
          userRole: res.body?.userRole
        };

        console.log(token);

        if (token && user) {
          this.userStorageService.saveToken(token);
          this.userStorageService.saveUser(user);
          return true;
        }
        return false;
      })
    );
  }

  getOrderByTrackingId(trackingId: string): Observable<any> {
    return this.http.get(`${baseUrl}order/${trackingId}`);
  }

  getCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}categories`);

  }

  getProductsByCategory(categoryId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}products/category/${categoryId}`);
  }


  getFilledCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}filled-categories`).pipe(
      map(response => {
        console.log("Filled Categories Response:", response);
        return response;
      })
    )
  }


}
