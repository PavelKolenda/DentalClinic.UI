import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class JwtService {

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return window.localStorage['jwtToken'];
    }
    return null;
  }

  setToken(token: string) {
    if (typeof window !== 'undefined') {
      window.localStorage['jwtToken'] = token;
    }
  }

  destroyToken(): void {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('jwtToken');
    }
  }
}
