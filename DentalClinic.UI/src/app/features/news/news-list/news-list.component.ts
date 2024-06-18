import { Component } from '@angular/core';
import {ListComponent} from "../../../shared/components/list-component/list.component";
import {NewsModel} from "../models/news.model";
import {Router} from "@angular/router";
import {SortService} from "../../../shared/services/sort.service";
import {NewsService} from "../news.service";
import {DatePipe} from "@angular/common";
import {TruncatePipe} from "../../../shared/truncate.pipe";

@Component({
  selector: 'app-news-list',
  standalone: true,
  imports: [
    DatePipe,
    TruncatePipe
  ],
  templateUrl: './news-list.component.html',
  styleUrl: './news-list.component.css'
})
export class NewsListComponent extends ListComponent<NewsModel>  {
  constructor(private newsService: NewsService, protected router: Router, sortService: SortService) {
    super(sortService);
  }

  protected override getItems(): void {
    this.newsService.getPaged(this.pagedRequest).subscribe((response) => {
      this.items = response;
    });
  }
}
