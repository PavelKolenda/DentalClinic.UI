import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {PagedRequest} from "../../../shared/models/paged-request";
import {map, Observable, pipe} from "rxjs";
import {PagedResponse} from "../../../shared/models/paged-response";
import {WorkingScheduleModel} from "../models/working-schedule/working-schedule.model";
import {environments} from "../../../../environments/environments.development";
import {WorkingScheduleCreateModel} from "../models/working-schedule/working-schedule-create.model";
import {WorkingScheduleUpdateModel} from "../models/working-schedule/working-schedule-update.model";

@Injectable({
  providedIn: 'root'
})
export class AdminWorkingScheduleService {

  constructor(private http: HttpClient) { }

  public getPaged(pagedRequest: PagedRequest, dayFilter?: string): Observable<PagedResponse<WorkingScheduleModel>>{
    let params = new HttpParams()
      .set('page', pagedRequest.page.toString())
      .set('pageSize', pagedRequest.pageSize.toString())
      .set('sortColumn', pagedRequest.sortColumn)
      .set('sortOrder', pagedRequest.sortOrder.toString());

    if(dayFilter){
      params = params.set('dayFilter', dayFilter);
    }

    return this.http.get<PagedResponse<WorkingScheduleModel>>(`${environments.apiUrl}workingschedules`,
      {params}).pipe(map((response => {
        console.log(response);
        return response;
    })))
  }

  public create(workingSchedule: WorkingScheduleCreateModel): Observable<WorkingScheduleModel> {
    return this.http.post<WorkingScheduleModel>(`${environments.apiUrl}workingschedules`, {workingSchedule})
      .pipe(map((response => {
      return response;
    })));
  }

  public update(id: number, workingSchedule: WorkingScheduleUpdateModel): Observable<void>{
    return this.http.put<void>(`${environments.apiUrl}workingschedules/${id}`,{workingSchedule});
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environments.apiUrl}workingschedules/${id}`);
  }

  public getById(id: number): Observable<WorkingScheduleModel> {
    return this.http.get<WorkingScheduleModel>(`${environments.apiUrl}workingschedules/${id}`)
      .pipe(map((response => {
        return response
      })));
  }
}
