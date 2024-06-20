import {Component, OnInit} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {NewsService} from "../../../../news/news.service";
import {WorkingScheduleCreateModel} from "../../../models/working-schedule/working-schedule-create.model";
import {NewsCreateModel} from "../../../../news/models/news-create.model";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-news-create',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './news-create.component.html',
  styleUrl: './news-create.component.css'
})
export class NewsCreateComponent implements OnInit{
    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }

  newsCreateForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(5)]],
    text: ['', [Validators.required]],
    createdAt: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder, private newsService: NewsService, private route: ActivatedRoute) {
  }

  public create() {
    if(!this.newsCreateForm.valid){
      return;
    }

    const formValues = this.newsCreateForm.getRawValue();
    const workingSchedule: NewsCreateModel = {
      title: formValues.title!,
      text: formValues.text!,
      createdAt: formValues.createdAt!.toString()
    };

    console.log(workingSchedule);

    this.newsService.create(workingSchedule).subscribe({
      next: (response) => {
        this.newsCreateForm.reset();
      },
      error: (error: HttpErrorResponse) => {}
    })
  }
}
