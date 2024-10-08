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
  
  constructor(private http:HttpClient) { }

  addCategory(categoryDto:any): Observable<any>{
    return this.http.post(`${baseUrl}api/admin/category`, categoryDto, {
      headers: this.createAuthorizationHeader(), 
    })
  }

  private createAuthorizationHeader(): HttpHeaders {
    const token = UserStorageService.getToken(); 
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
}
