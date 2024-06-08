import {Component, OnInit} from "@angular/core";
import {PagedRequest} from "../models/paged-request";
import {PagedResponse} from "../models/paged-response";
import {SortService} from "../services/sort.service";

@Component({
  template: '' // Add this line
})
export abstract class ListComponent<T> implements OnInit {
  pagedRequest: PagedRequest = {
    page: 1,
    pageSize: 10,
    sortColumn: '',
    sortOrder: 0
  };

  items: PagedResponse<T> | null = null;

  protected constructor(protected sortService: SortService) {}

  ngOnInit(): void {
    this.getItems();
  }

  protected abstract getItems(): void;

  nextPage(): void {
    if (this.items && this.items.hasNextPage) {
      this.pagedRequest.page++;
      this.getItems();
    }
  }

  previousPage(): void {
    if (this.items && this.items.hasPreviousPage) {
      this.pagedRequest.page--;
      this.getItems();
    }
  }

  public sort(column: string): void {
    this.sortService.sort(this.pagedRequest, column);
    this.getItems();
  }
}
