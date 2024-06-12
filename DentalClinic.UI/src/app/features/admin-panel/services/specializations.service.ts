import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {PagedRequest} from "../../../shared/models/paged-request";
import {catchError, map, Observable} from "rxjs";
import {PagedResponse} from "../../../shared/models/paged-response";
import {Dentist} from "../../appointments/models/dentist";
import {environments} from "../../../../environments/environments.development";
import {Specialization} from "../../appointments/models/specialization";
import {DentistCreateModel} from "../models/dentist/dentist-create.model";
import {SpecializationCreateModel} from "../models/specializations/specialization-create.model";
import {DentistUpdateModel} from "../models/dentist/dentist-update.model";
import {SpecializationUpdateModel} from "../models/specializations/specialization-update.model";

@Injectable({
  providedIn: 'root'
})
export class SpecializationsService {

  constructor(private http: HttpClient) { }

  public getPaged(pagedRequest: PagedRequest): Observable<PagedResponse<Specialization>> {
    let params = new HttpParams()
      .set('page', pagedRequest.page.toString())
      .set('pageSize', pagedRequest.pageSize.toString())
      .set('sortColumn', pagedRequest.sortColumn)
      .set('sortOrder', pagedRequest.sortOrder.toString());

    return this.http.get<PagedResponse<Specialization>>(`${environments.apiUrl}specializations`, {params})
      .pipe(map((response => {
        return response;
      })), catchError(err => {
        return [];
      }));
  }

  public create(specialization: SpecializationCreateModel): Observable<Specialization> {
    return this.http.post<Dentist>(`${environments.apiUrl}specializations`,  specialization)
      .pipe(map((response => {
        return response;
      })));
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environments.apiUrl}specializations/${id}`);
  }

  public update(id: number, specialization: SpecializationUpdateModel): Observable<void> {
    return this.http.put<void>(`${environments.apiUrl}specializations/${id}`, specialization);
  }

  public getById(id: number): Observable<Specialization>{
    return this.http.get<Specialization>(`${environments.apiUrl}specializations/${id}`)
      .pipe(map((response => {
        return response;
      })));
  }
}
