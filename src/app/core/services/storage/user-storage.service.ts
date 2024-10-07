import { Injectable } from '@angular/core';

export const TOKEN = 'jwt'; 
export const USER = 'user';

@Injectable({
  providedIn: 'root'
})

export class UserStorageService {

  constructor() { }

  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  public saveUser(user: any): void {
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }
}
