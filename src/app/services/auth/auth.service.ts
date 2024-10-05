import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UserStorageService } from '../storage/user-storage.service';

const BASIC_URL="http://localhost:8080/";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient,
    private userStorageService: UserStorageService,
  ) { }

  register(signupRequest:any): Observable<any>{
    return this.http.post(BASIC_URL + "sign-up", signupRequest);
  }

  login(username: string, password: string): any {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = { username, password };

    return this.http.post(BASIC_URL + 'authenticate', body, { headers, observe: 'response' }).pipe(
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
}






















// login(username: string, password:string):any{
//   const headers = new HttpHeaders().set('Content-Type', 'application/json');
//   const body = {username, password};

//   return this.http.post(BASIC_URL + 'authenticate', body, {headers, observe:'response'}).pipe(
//     map((res)=>{
//       console.log(res);
//       const token = res.headers.get('authorization');
//       const user = res.body;
//       console.log(token);

//       if(token && user){
//         this.userStorageService.saveToken(token);
//         this.userStorageService.saveUser(user);
//         return true;

//       }
//       return false;
//     })
//   )
// }