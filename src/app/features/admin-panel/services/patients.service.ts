import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {PagedRequest} from "../../../shared/models/paged-request";
import {catchError, map, Observable} from "rxjs";
import {PagedResponse} from "../../../shared/models/paged-response";
import {environments} from "../../../../environments/environments.development";
import {PatientModel} from "../models/patients/patient.model";
import {PatientUpdateModel} from "../../patient/models/patient-update.model";

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  constructor(private http: HttpClient) { }

  public getPaged(pagedRequest: PagedRequest): Observable<PagedResponse<PatientModel>> {
    let params = new HttpParams()
      .set('page', pagedRequest.page.toString())
      .set('pageSize', pagedRequest.pageSize.toString())
      .set('sortColumn', pagedRequest.sortColumn)
      .set('sortOrder', pagedRequest.sortOrder.toString());

    return this.http.get<PagedResponse<PatientModel>>(`${environments.apiUrl}patients`, {params})
      .pipe(map((response => {
        return response;
      })), catchError(err => {
        return [];
      }));
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environments.apiUrl}patients/${id}`);
  }

  public getById(id: number): Observable<PatientModel>{
    return this.http.get<PatientModel>(`${environments.apiUrl}patients/${id}`)
      .pipe(map((response => {
        return response;
      })))
  }

  public update(id: number, patient: PatientUpdateModel){
    return this.http.put<void>(`${environments.apiUrl}patients/${id}`, patient);
  }
}
