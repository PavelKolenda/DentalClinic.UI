import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {DentistWorkingScheduleModel} from "../models/dentist-working-schedule/dentist-working-schedule.model";
import {environments} from "../../../../environments/environments.development";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AdminDentistWorkingScheduleService {

  constructor(private http: HttpClient) { }

  public getDentistWorkingSchedule(dentistId: number): Observable<DentistWorkingScheduleModel> {
    return this.http.get<DentistWorkingScheduleModel>(`${environments.apiUrl}dentists/${dentistId}/schedule`)
      .pipe(map((response => {
        return response;
      })))
  }

  public deleteDentistWorkingSchedule(dentistId: number, scheduleId: number): Observable<void> {
    return this.http.delete<void>(`${environments.apiUrl}dentists/${dentistId}/schedule/${scheduleId}`);
  }
}
