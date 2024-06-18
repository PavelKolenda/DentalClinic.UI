import { Injectable } from '@angular/core';
import {PagedRequest} from "../../shared/models/paged-request";
import {catchError, map, Observable} from "rxjs";
import {PagedResponse} from "../../shared/models/paged-response";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environments} from "../../../environments/environments.development";
import {NewsModel} from "./models/news.model";
import {NewsCreateModel} from "./models/news-create.model";
import {NewsUpdateModel} from "./models/news-update.model";

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  public getPaged(pagedRequest: PagedRequest): Observable<PagedResponse<NewsModel>> {
    let params = new HttpParams()
      .set('page', pagedRequest.page.toString())
      .set('pageSize', pagedRequest.pageSize.toString())
      .set('sortColumn', pagedRequest.sortColumn)
      .set('sortOrder', pagedRequest.sortOrder.toString());

    return this.http.get<PagedResponse<NewsModel>>(environments.apiUrl + 'news', {params})
      .pipe(map((response => {
        return response;
      })), catchError(err => {
        return [];
      }));
  }

  public create(news: NewsCreateModel): Observable<NewsModel> {
    return this.http.post<NewsModel>(environments.apiUrl + 'news',  news)
      .pipe(map((response => {
        console.log(response)
        return response;
      })));
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environments.apiUrl}news/${id}`);
  }

  public update(id: number, news: NewsUpdateModel): Observable<void> {
    return this.http.put<void>(`${environments.apiUrl}news/${id}`, news);
  }

  public getById(id: number){
    return this.http.get<NewsModel>(`${environments.apiUrl}news/${id}`,)
      .pipe(map((response => {
        return response;
      })), catchError(err => {
        return [];
      }));
  }
}
