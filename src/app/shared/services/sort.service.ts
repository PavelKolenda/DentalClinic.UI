import { Injectable } from '@angular/core';
import {PagedRequest} from "../models/paged-request";

@Injectable({
  providedIn: 'root'
})
export class SortService {

  constructor() { }

  public sort(pagedRequest: PagedRequest, column: string): void {
    if (pagedRequest.sortColumn === column) {
      pagedRequest.sortOrder = (pagedRequest.sortOrder + 1) % 3;
    }
    else {
      pagedRequest.sortColumn = column;
      pagedRequest.sortOrder = 1;
    }
  }
}
