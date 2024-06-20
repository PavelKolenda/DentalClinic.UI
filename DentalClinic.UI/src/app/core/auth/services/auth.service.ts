import {Injectable, signal} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, EMPTY, map, Observable, take, tap} from "rxjs";
import {AuthResponse} from "../models/AuthResponse";
import {JwtService} from "./jwt.service";
import {jwtDecode, JwtPayload} from "jwt-decode";
import {environments} from "../../../../environments/environments.development";
import {Router} from "@angular/router";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  currentUserSignal = signal<AuthResponse | undefined | null>(undefined);

  constructor(private readonly http: HttpClient, private jwtService: JwtService, private router: Router) {
    this.getInitialUserState();
  }

  public isDentist(): boolean {
    const token = this.jwtService.getToken();
    if (!token) return false;

    const decoded = jwtDecode<RoleJwtPayload>(token);
    const roles: string[] = decoded.role || [];

    return roles.includes('Dentist');
  }

  public getDentistIdFromToken(): string | null {
    const token = this.jwtService.getToken();
    if (!token) return null;

    const decoded = jwtDecode<RoleJwtPayload>(token);
    return decoded.dentistId || null;
  }

  public getPatientIdFromToken(): string | null {
    const token = this.jwtService.getToken();
    if (!token) return null;

    const decoded = jwtDecode<RoleJwtPayload>(token);
    console.log(decoded.Id);
    return decoded.Id || null;
  }

  public isAdmin(): boolean{
    const token = this.jwtService.getToken();
    if(!token) return false;

    const decoded = jwtDecode<RoleJwtPayload>(token);
    const roles: string[] = decoded.role || [];

    return roles.includes('Admin');
  }

  public isPatient(): boolean{
    const token = this.jwtService.getToken();
    if(!token) return false;

    const decoded = jwtDecode<RoleJwtPayload>(token);
    const roles: string[] = decoded.role || [];

    return roles.includes('Patient');
  }

  public register(email?: string, password?: string, name?: string, surname?: string, patronymic?: string, birthDate?: string, phoneNumber?: string, address?: string): Observable<AuthResponse> {

    return this.http.post<AuthResponse>(`${environments.apiUrl}auth/register`, {
      email,
      password,
      name,
      surname,
      patronymic,
      birthDate,
      phoneNumber,
      address
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
    this.router.navigateByUrl('');
    this.currentUserSignal.set(null);
  }

  isTokenExpired(token: string) {
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
      this.http.get<AuthResponse>(`${environments.apiUrl}auth`).pipe(
        tap((response) => {
          this.currentUserSignal.set(response);
          console.log(this.currentUserSignal())
        }),
        catchError((error) => {
          console.error(error);
          this.currentUserSignal.set(null);
          return EMPTY;
        })
      ).subscribe();
    }
  }
}

interface RoleJwtPayload extends JwtPayload {
  role: string[];
  dentistId: string;
  Id: string;
}
