import {Component, OnInit} from '@angular/core';
import {AdminDentistWorkingScheduleService} from "../../../../services/admin-dentist-working-schedule.service";
import {DentistWorkingScheduleModel} from "../../../../models/dentist-working-schedule/dentist-working-schedule.model";
import {ActivatedRoute} from "@angular/router";
import {DatePipe} from "@angular/common";
import {AdminWorkingScheduleService} from "../../../../services/admin-working-schedule.service";
import {FormsModule} from "@angular/forms";
import {WorkingScheduleModel} from "../../../../models/working-schedule/working-schedule.model";
import {PagedRequest} from "../../../../../../shared/models/paged-request";

@Component({
  selector: 'app-dentist-working-schedule',
  standalone: true,
  imports: [
    DatePipe,
    FormsModule
  ],
  templateUrl: './dentist-working-schedule.component.html',
  styleUrls: [
    './dentist-working-schedule.component.css',
    '../../../../../../shared/components/list-component/list.component.css',
    ]
})
export class DentistWorkingScheduleComponent implements OnInit{

  constructor(private dentistWorkingScheduleService: AdminDentistWorkingScheduleService,
              private route: ActivatedRoute,
              private workingScheduleService: AdminWorkingScheduleService) {
  }

  showAdd: boolean = false;
  dentistWorkingSchedule: DentistWorkingScheduleModel | null = null;
  dentistId: number = 0;
  selectedDay: string | null = null;
  workingSchedulesForDay: WorkingScheduleModel[] = [];

  ngOnInit(): void {
    const dentistId = this.route.snapshot.paramMap.get('dentistId');
    if (dentistId) {
      this.dentistId = +dentistId;
      this.loadDentistWorkingSchedule(+dentistId);
    }
  }

  private loadDentistWorkingSchedule(dentistId: number) {
    this.dentistWorkingScheduleService.getDentistWorkingSchedule(dentistId).subscribe((response) => {
      this.dentistWorkingSchedule = response;
    })
  }

  public deleteDentistWorkingSchedule(scheduleId: number) {
    if(this.dentistId != 0){
      console.log(1);
      this.dentistWorkingScheduleService.deleteDentistWorkingSchedule(this.dentistId, scheduleId)
        .subscribe((response) => {
          this.loadDentistWorkingSchedule(this.dentistId);
      });
    }
  }

  pagedRequest: PagedRequest = {
    page: 1,
    pageSize: 20,
    sortColumn: '',
    sortOrder: 0
  }

  public getWorkingSchedulesForDay(): void {
    if (this.selectedDay) {
      console.log(this.selectedDay);
      this.workingScheduleService.getPaged(this.pagedRequest, this.selectedDay)
        .subscribe((response) => {
          this.workingSchedulesForDay = response.items;
        });
    }
  }

  addWorkingScheduleToDentist(scheduleId: number){
    this.dentistWorkingScheduleService.addWorkingScheduleToDentist(this.dentistId, scheduleId)
      .subscribe((response) => {
        this.loadDentistWorkingSchedule(this.dentistId);
      });

  }
}
