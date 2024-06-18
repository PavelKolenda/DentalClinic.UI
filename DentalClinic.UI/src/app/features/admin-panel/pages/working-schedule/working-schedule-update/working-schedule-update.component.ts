import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {AdminWorkingScheduleService} from "../../../services/admin-working-schedule.service";
import {WorkingScheduleUpdateModel} from "../../../models/working-schedule/working-schedule-update.model";
import {NgxMaskDirective} from "ngx-mask";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-working-schedule-update',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgxMaskDirective
  ],
  templateUrl: './working-schedule-update.component.html',
  styleUrl: './working-schedule-update.component.css'
})
export class WorkingScheduleUpdateComponent implements OnInit {

  workingSchedule: WorkingScheduleUpdateModel | null = null;
  workingScheduleId: number = 0;
  workingScheduleForm = this.fb.group({
    start: ['', [Validators.required]],
    end: ['', [Validators.required]],
    workingDay: ['', Validators.required]
  });

  constructor(private fb: FormBuilder,
              private workingScheduleService: AdminWorkingScheduleService,
              private route: ActivatedRoute) {
  }

  public errorMessages: { [key: string]: string } = {};

  ngOnInit(): void {
    const workingScheduleIdParams = this.route.snapshot.paramMap.get('workingScheduleId');
    if (workingScheduleIdParams) {
      this.workingScheduleId = +workingScheduleIdParams;
      this.workingScheduleService.getById(this.workingScheduleId)
        .subscribe((response) => {
          this.workingSchedule = response;
          this.workingScheduleForm.patchValue(this.workingSchedule);
        });
    }
  }

  public update(): void {
    if (this.workingScheduleForm === null || this.workingScheduleForm.invalid) {
      return;
    }
    let updateWorkingSchedule: WorkingScheduleUpdateModel = {
      start: this.formatTime(this.workingScheduleForm.controls.start.value!),
      end: this.formatTime(this.workingScheduleForm.controls.end.value!),
      workingDay: this.workingScheduleForm.controls.workingDay.value!,
    };

    this.workingScheduleService.update(this.workingScheduleId, updateWorkingSchedule)
      .subscribe({
        next: (response) => {
          alert("Запись обновлена");
        },
        error: (error: HttpErrorResponse) => {
          this.errorMessages = {};
          if (error.status === 400 && error.error) {
            if (error.error.detail.includes("Working day can't be more than 12 hours")) {
              this.errorMessages['WorkingDayMoreThan12Hours'] = 'Рабочий день не может быть более 12 часов';
            }
          }
        }
      });
  }

  private formatTime(timeString: string): string {
    return timeString ? `${timeString[0]}${timeString[1]}:${timeString[2]}${timeString[3]}:00` : '';
  }
}
