import {Injectable, signal} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {AuthResponse} from "../models/AuthResponse";
import {JwtService} from "./jwt.service";
import {jwtDecode} from "jwt-decode";

const AUTH_API = 'https://localhost:7098/api/auth/';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  currentUserSignal = signal<AuthResponse | undefined | null>(undefined);

  constructor(private readonly http: HttpClient, private jwtService: JwtService) {
  }

  public register(email?: string, password?: string, name?: string, surname?: string, patronymic?: string, birthDate?: string): Observable<AuthResponse> {

    return this.http.post<AuthResponse>(AUTH_API + 'register', {
      email,
      password,
      name,
      surname,
      patronymic,
      birthDate
    }, httpOptions)
      .pipe(map(response => {
        this.jwtService.setToken(response.token);
        return response;
      }));
  }

  public login(email?: string, password?: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(AUTH_API + 'login', {email, password}, httpOptions)
      .pipe(map((response => {
        console.log(response)
        this.jwtService.setToken(response.token);
        return response;
      })));
  }

  public logout(): void {
    this.jwtService.destroyToken();
    this.currentUserSignal.set(null);
  }

  private isTokenExpired() {
    const token = this.jwtService.getToken();
    if (!token) {
      return true;
    }
    const decoded = jwtDecode(token);
    const isTokenExpired = Date.now() > decoded['exp']! * 1000;
    if (isTokenExpired) {
      this.logout();
    }
    return isTokenExpired;
  }

  public isLogin(): boolean{
    if(this.currentUserSignal() === null || this.currentUserSignal() === undefined) {
      return false;
    }
    return true;
  }
}
