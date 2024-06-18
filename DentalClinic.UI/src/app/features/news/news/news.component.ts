import {Component, OnInit} from '@angular/core';
import {AppointmentService} from "../../appointments/services/appointment.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../core/auth/services/auth.service";
import {NewsModel} from "../models/news.model";
import {NewsService} from "../news.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent implements OnInit{
  constructor(
    private newsService: NewsService,
    private route: ActivatedRoute,
  ) {}

  newsId: number = 0;
  news: NewsModel | null = null;

  ngOnInit(): void {
    const newsIdParams = this.route.snapshot.paramMap.get('newsId');
    if (newsIdParams) {
      this.newsId = +newsIdParams;
      this.newsService.getById(this.newsId).subscribe((response) => {
        this.news = response;
      })
    }
  }
}
