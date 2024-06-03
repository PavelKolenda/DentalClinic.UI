import {Injectable, signal} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable, take} from "rxjs";
import {AuthResponse} from "../models/AuthResponse";
import {JwtService} from "./jwt.service";
import {jwtDecode} from "jwt-decode";
import {environments} from "../../../../environments/environments.development";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  currentUserSignal = signal<AuthResponse | undefined | null>(undefined);

  constructor(private readonly http: HttpClient, private jwtService: JwtService) {
    this.getInitialUserState();
  }

  public register(email?: string, password?: string, name?: string, surname?: string, patronymic?: string, birthDate?: string): Observable<AuthResponse> {

    return this.http.post<AuthResponse>(`${environments.apiUrl}auth/register`, {
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
    return this.http.post<AuthResponse>( `${environments.apiUrl}auth/login`, {email, password}, httpOptions)
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

  private isTokenExpired(token: string) {
    if(!token){
      return false;
    }

    const decoded = jwtDecode(token);
    const isTokenExpired = Date.now() >= decoded['exp']! * 1000;
    if (isTokenExpired) {
      this.logout();
      return false;
    }
    return isTokenExpired;
  }

  public isLogin(): boolean{
    const token = this.jwtService.getToken();
    if(!token) return false;
    return !this.isTokenExpired(token);
  }

  private getInitialUserState(): void {
    const token = this.jwtService.getToken();
    if (token && !this.isTokenExpired(token)) {
      this.http.get<AuthResponse>(`${environments.apiUrl}auth`)
        .subscribe((response) => {
          this.currentUserSignal.set(response);
        }, (error) => {
          console.error(error);
          this.currentUserSignal.set(null);
        });
    } else {
      this.currentUserSignal.set(null);
    }
  }
}
