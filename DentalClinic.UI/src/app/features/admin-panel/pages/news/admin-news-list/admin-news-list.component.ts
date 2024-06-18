import { Component } from '@angular/core';
import {ListComponent} from "../../../../../shared/components/list-component/list.component";
import {NewsModel} from "../../../../news/models/news.model";
import {NewsService} from "../../../../news/news.service";
import {Router} from "@angular/router";
import {SortService} from "../../../../../shared/services/sort.service";
import {FormsModule} from "@angular/forms";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-admin-news-list',
  standalone: true,
  imports: [
    FormsModule,
    DatePipe
  ],
  templateUrl: './admin-news-list.component.html',
  styleUrls: [
    './admin-news-list.component.css',
    './../../../../../shared/components/list-component/list.component.css'
  ]
})
export class AdminNewsListComponent extends ListComponent<NewsModel> {
  constructor(private newsService: NewsService, protected router: Router, sortService: SortService) {
    super(sortService);
  }

  protected override getItems(): void {
    this.newsService.getPaged(this.pagedRequest).subscribe((response) => {
      this.items = response;
    });
  }

  public delete(id: number){
    if (window.confirm('Вы уверены что хотите удалить?')) {
      this.newsService.delete(id).subscribe((response) => {
        this.getItems();
      }, (error) => {
        console.error('Error deleting dentist:', error);
      });
    }
  }
}
