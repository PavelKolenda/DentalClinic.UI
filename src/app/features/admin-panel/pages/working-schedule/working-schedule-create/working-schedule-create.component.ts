import {Component} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {AdminWorkingScheduleService} from "../../../services/admin-working-schedule.service";
import {WorkingScheduleCreateModel} from "../../../models/working-schedule/working-schedule-create.model";
import {NgxMaskDirective} from "ngx-mask";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-working-schedule-create',
  standalone: true,
  imports: [ReactiveFormsModule, NgxMaskDirective],
  templateUrl: './working-schedule-create.component.html',
  styleUrl: './working-schedule-create.component.css'
})
export class WorkingScheduleCreateComponent {
  workingScheduleCreateForm = this.fb.group({
    start: ['', [Validators.required]], end: ['', [Validators.required]], workingDay: ['', [Validators.required]],
  });
  public errorMessages: { [key: string]: string } = {};
  private userFriendlyMessages: CreateWorkingScheduleErrorMessages = {
    End: 'Конец рабочего дня должен быть больше начала', Start: 'Начало рабочего дня должно меньше конца',
  };

  constructor(private fb: FormBuilder, private workingScheduleService: AdminWorkingScheduleService, private route: ActivatedRoute) {
  }

  public create() {
    const formValues = this.workingScheduleCreateForm.getRawValue();
    const workingSchedule: WorkingScheduleCreateModel = {
      start: this.formatTime(formValues.start!),
      end: this.formatTime(formValues.end!),
      workingDay: formValues.workingDay!
    };

    this.workingScheduleService.create(workingSchedule).subscribe({
      next: (response) => {
        this.workingScheduleCreateForm.reset();
        this.errorMessages = {};
      }, error: (error: HttpErrorResponse) => {
        this.errorMessages = {};
        console.log(error);

        if (error.status === 400 && error.error) {
          if (error.error.detail.includes('Provided working schedule already exists')) {
            this.errorMessages['ScheduleExists'] = 'Такое рабочее время уже существует';
          }
          if (error.error.detail.includes("Working day can't be more than 12 hours")) {
            this.errorMessages['WorkingDayMoreThan12Hours'] = 'Рабочий день не может быть более 12 часов';
          }

          if (error.error.errors) {
            console.log(this.errorMessages);
            for (const key in error.error.errors) {
              if (this.userFriendlyMessages[key]) {
                this.errorMessages[key] = this.userFriendlyMessages[key];
              }
            }
          }
        }
      }
    });
  }

  private formatTime(timeString: string): string {
    return timeString ? `${timeString[0]}${timeString[1]}:${timeString[2]}${timeString[3]}:00` : '';
  }
}

export interface CreateWorkingScheduleErrorMessages {
  End: string;
  Start: string;

  [key: string]: string;
}


