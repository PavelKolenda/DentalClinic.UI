import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environments} from "../../../../environments/environments.development";
import {catchError, map, Observable} from "rxjs";
import {PagedResponse} from "../../../shared/models/paged-response"
import {Specialization} from "../models/specialization";
import {PagedRequest} from "../../../shared/models/paged-request";
import {Dentist} from "../models/dentist";
import {AvailableAppointments} from "../models/available-appointments";
import {AuthService} from "../../../core/auth/services/auth.service";
import {AppointmentDetails} from "../models/appointment-details";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({providedIn: 'root'})
export class AppointmentService {
  constructor(private http: HttpClient, private authService: AuthService) {
  }

  public getSpecializations(): Observable<PagedResponse<Specialization>> {
    const pagedRequest: PagedRequest = {
      page: 1, pageSize: 100, sortColumn: "", sortOrder: 0
    };

    const params = new HttpParams()
      .set('page', pagedRequest.page.toString())
      .set('pageSize', pagedRequest.pageSize.toString())
      .set('sortColumn', pagedRequest.sortColumn)
      .set('sortOrder', pagedRequest.sortOrder.toString());

    return this.http.get<PagedResponse<Specialization>>(environments.apiUrl + 'specializations', {params})
      .pipe(map((response => {
        return response;
      })), catchError(err => {
        return [];
      }));
  }

  public getDentists(specializationId: number): Observable<Dentist[]> {
    return this.http.get<Dentist[]>(`${environments.apiUrl}specializations/${specializationId}/dentists`)
      .pipe(map((response => {
        return response;
      })));
  }

  public getAvailableAppointments(dentistId: number): Observable<AvailableAppointments[]> {
    return this.http.get<AvailableAppointments[]>(`${environments.apiUrl}dentists/${dentistId}/available-appointments`)
      .pipe(map((response => {
        return response;
      })));
  }

  public createAppointment(dentistId: number, appointmentId: number): Observable<AppointmentDetails> {
    if (!this.authService.isLogin()) {
      throw new Error();
    }

    return this.http.post<AppointmentDetails>(`${environments.apiUrl}appointments/${dentistId}/${appointmentId}`, {}, httpOptions)
      .pipe(map((response) => {
        return response;
      }));
  }

  public getAppointmentDetails(appointmentId: number) {
    return this.http.get<AppointmentDetails>(`${environments.apiUrl}appointments/${appointmentId}`)
      .pipe(map((response => {
        return response;
      })));
  }

  public getAppointments(pagedRequest: PagedRequest): Observable<PagedResponse<AppointmentDetails>> {
    if(pagedRequest.page < 1) {
      pagedRequest.page = 1;
    }
    const params = new HttpParams()
      .set('page', pagedRequest.page)
      .set('pageSize', pagedRequest.pageSize);

    return this.http.get<PagedResponse<AppointmentDetails>>(environments.apiUrl + 'patients/appointments',
      {params})
      .pipe(map((response => {
        return response;
      })));
  }

  public patientReenrollment(patientId: number, appointmentId: number): Observable<AppointmentDetails> {
    return this.http.post<AppointmentDetails>
    (`${environments.apiUrl}appointments/${patientId}/${appointmentId}/reenrollment`, {}, httpOptions)
      .pipe(map((response) => {
        return response;
      }));
  }

  public downloadAppointmentInfoPdf(appointmentId: number){
    return this.http.get(`${environments.apiUrl}appointments/${appointmentId}/download`,
      {responseType:'blob'})
  }
}
