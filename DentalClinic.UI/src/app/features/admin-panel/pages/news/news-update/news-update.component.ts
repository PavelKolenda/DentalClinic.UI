import {Component, OnInit} from '@angular/core';
import {NewsModel} from "../../../../news/models/news.model";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NewsService} from "../../../../news/news.service";
import {ActivatedRoute} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {NewsUpdateModel} from "../../../../news/models/news-update.model";

@Component({
  selector: 'app-news-update',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './news-update.component.html',
  styleUrls: [
    './news-update.component.css',
    './../news-create/news-create.component.css'
  ]
})
export class NewsUpdateComponent implements OnInit{

  news: NewsModel | null = null;
  newsId: number = 0;

  newsUpdateForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(5)]],
    text: ['', [Validators.required]],
    createdAt: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder, private newsService: NewsService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const newsIdParams = this.route.snapshot.paramMap.get('newsId');
    if (newsIdParams) {
      this.newsId = +newsIdParams;
      this.newsService.getById(this.newsId)
        .subscribe((response) => {
          this.news = response;
          this.newsUpdateForm.patchValue(this.news);
        });
    }
  }

  public update(): void {
    if (this.newsUpdateForm === null || this.newsUpdateForm.invalid) {
      return;
    }
    let newsUpdate: NewsUpdateModel = {
      title: this.newsUpdateForm.controls.title.value!,
      text: this.newsUpdateForm.controls.text.value!,
      createdAt: this.newsUpdateForm.controls.createdAt.value!,
    };

    this.newsService.update(this.newsId, newsUpdate)
      .subscribe({
        next: (response) => {
          alert("Запись обновлена");
        },
        error: (error: HttpErrorResponse) => { }
      });
  }
}
