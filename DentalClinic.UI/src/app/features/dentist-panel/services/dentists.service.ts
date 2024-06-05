import {Injectable} from '@angular/core';
import {catchError, map, Observable} from "rxjs";
import {AppointmentDetails} from "../../appointments/models/appointment-details";
import {HttpClient, HttpParams} from "@angular/common/http";
import {PagedResponse} from "../../../shared/models/paged-response";
import {PagedRequest} from "../../../shared/models/paged-request";
import {environments} from "../../../../environments/environments.development";

@Injectable({
  providedIn: 'root'
})
export class DentistsService {

  constructor(private readonly http: HttpClient) {
  }

  public getAppointmentsList(pagedRequest: PagedRequest, specificDate?: string)
    : Observable<PagedResponse<AppointmentDetails>> {
    let params = new HttpParams()
      .set('page', pagedRequest.page.toString())
      .set('pageSize', pagedRequest.pageSize.toString())
      .set('sortColumn', pagedRequest.sortColumn)
      .set('sortOrder', pagedRequest.sortOrder.toString());

    if(specificDate){
      params = params.set('specificDate', specificDate)
    }

    return this.http.get<PagedResponse<AppointmentDetails>>(environments.apiUrl + 'dentists/appointments-list',
      {params})
      .pipe(map((response => {
        return response;
      })), catchError(err => {
        return [];
      }));
  }
}
