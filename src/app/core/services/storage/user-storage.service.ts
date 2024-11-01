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

  static getToken(): string | null {
    return localStorage.getItem(TOKEN);
  }

  static getUser(): any {
    const user = localStorage.getItem(USER);
    return user ? JSON.parse(user) : null;
  }
  
  static getUserId(): string {
    const user = this.getUser();
    if (user == null){
      return "";
    }
    return user.userId;
  }

  static getUserRole(): string {
    const user = this.getUser();
    if (user == null){
      return "";
    }
    return user.userRole;
  }

  static isAdminLoggedIn(): boolean {
    if (this.getToken() === null ){
      return false;
    }
    const role: string = this.getUserRole();
    return role === 'ADMIN';
  }

  static isCustomerLoggedIn(): boolean {
    if (this.getToken() === null ){
      return false;
    }
    const role: string = this.getUserRole();
    return role === 'CUSTOMER';
  }

  static signOut(): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }

  public static isAuthenticated(): boolean {
    return this.getToken() !== null; // Retourne true si un token est présent
  }

  public getToken(): string | null {
    return localStorage.getItem(TOKEN);
  }
  



}