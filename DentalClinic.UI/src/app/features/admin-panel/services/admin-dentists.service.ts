import { Injectable } from '@angular/core';
import {AuthService} from "../../../core/auth/services/auth.service";
import {catchError, map, Observable} from "rxjs";
import {Dentist} from "../../appointments/models/dentist";
import {PagedResponse} from "../../../shared/models/paged-response";
import {HttpClient, HttpParams} from "@angular/common/http";
import {PagedRequest} from "../../../shared/models/paged-request";
import {environments} from "../../../../environments/environments.development";
import {DentistCreateModel} from "../models/dentist/dentist-create.model";
import {DentistUpdateModel} from "../models/dentist/dentist-update-model";
import {DentistAsUserModel} from "../models/dentist/dentist-as-user.model";

@Injectable({
  providedIn: 'root'
})
export class AdminDentistsService {
  constructor(private authService: AuthService, private http: HttpClient) { }

  public getPaged(pagedRequest: PagedRequest): Observable<PagedResponse<Dentist>> {
    let params = new HttpParams()
      .set('page', pagedRequest.page.toString())
      .set('pageSize', pagedRequest.pageSize.toString())
      .set('sortColumn', pagedRequest.sortColumn)
      .set('sortOrder', pagedRequest.sortOrder.toString());

    return this.http.get<PagedResponse<Dentist>>(environments.apiUrl + 'dentists', {params})
      .pipe(map((response => {
        return response;
      })), catchError(err => {
        return [];
      }));
  }

  public createDentist(dentist: DentistCreateModel): Observable<Dentist> {
    return this.http.post<Dentist>(environments.apiUrl + 'dentists',  dentist)
      .pipe(map((response => {
        console.log(response)
        return response;
    })));
  }

  public deleteDentist(id: number): Observable<void> {
    return this.http.delete<void>(`${environments.apiUrl}dentists/${id}`);
  }

  public updateDentist(id: number, dentist: DentistUpdateModel): Observable<void> {
    return this.http.put<void>(`${environments.apiUrl}dentists/${id}`, dentist);
  }

  public getDentistAsUser(id: number): Observable<DentistAsUserModel> {
    return this.http.get<DentistAsUserModel>(`${environments.apiUrl}dentists/${id}`)
      .pipe(map((response => {
        return response;
      })));
  }
}
