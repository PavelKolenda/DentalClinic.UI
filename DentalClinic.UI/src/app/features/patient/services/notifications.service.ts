import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {PagedRequest} from "../../../shared/models/paged-request";
import {catchError, map, Observable} from "rxjs";
import {NotificationModel} from "../models/notification.model";
import {PagedResponse} from "../../../shared/models/paged-response";
import {environments} from "../../../../environments/environments.development";

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private http: HttpClient) { }

  public getPaged(pagedRequest: PagedRequest): Observable<PagedResponse<NotificationModel>> {
    let params = new HttpParams()
      .set('page', pagedRequest.page.toString())
      .set('pageSize', pagedRequest.pageSize.toString())
      .set('sortColumn', pagedRequest.sortColumn)
      .set('sortOrder', pagedRequest.sortOrder.toString());

    return this.http.get<PagedResponse<NotificationModel>>(`${environments.apiUrl}notifications`, {params})
      .pipe(map((response => {
        console.log(response);
        return response;
      })), catchError(err => {
        return [];
      }));
  }
}
