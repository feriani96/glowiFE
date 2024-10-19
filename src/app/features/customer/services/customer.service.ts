import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from 'src/app/core/services/storage/user-storage.service';
import { environment } from 'src/environments/environment';

const baseUrl = environment.BASIC_URL;


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }


  getAllProducts(): Observable<any> {
    return this.http.get(`${baseUrl}api/customer/products`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getAllProductByName(name:any): Observable<any> {
    return this.http.get(`${baseUrl}api/customer/search/${name}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  private createAuthorizationHeader(): HttpHeaders {
    const token = UserStorageService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
}
