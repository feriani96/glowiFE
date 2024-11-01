import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UserStorageService } from '../storage/user-storage.service';
import { environment } from 'src/environments/environment';

const baseUrl = environment.BASIC_URL;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.BASIC_URL;


  constructor(private http:HttpClient,
    private userStorageService: UserStorageService,
  ) { }

  register(signupRequest:any): Observable<any>{
    return this.http.post(`${this.baseUrl}sign-up`, signupRequest);
  }

  login(email: string, password: string): any {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = { email, password };

    return this.http.post(`${this.baseUrl}authenticate`, body, { headers, observe: 'response' }).pipe(
      map((res: any) => {
        console.log(res);

        // Extract JWT from response body
        const token = res.body?.jwt;
        const user = {
          userId: res.body?.userId,
          userRole: res.body?.userRole
        };

        console.log(token);

        if (token && user) {
          // Store token and user data in localStorage
          this.userStorageService.saveToken(token);
          this.userStorageService.saveUser(user);
          return true;
        }
        return false;
      })
    );
  }

  getOrderByTrackingId(trackingId: string): Observable<any>{
    return this.http.get(`${baseUrl}order/${trackingId}`)
  }

  public getCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}categories`);
  }

  public getProductsByCategory(categoryId: string): Observable<any> {
    const token = this.userStorageService.getToken(); // Récupérez le token stocké
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Ajoutez le token à l'en-tête
    });
  
    return this.http.get(`${this.baseUrl}products/category/${categoryId}`, { headers });
  }
  

}

