import { Component } from '@angular/core';
import {ListComponent} from "../../../../../shared/components/list-component/list.component";
import {WorkingScheduleModel} from "../../../models/working-schedule/working-schedule.model";
import {Router} from "@angular/router";
import {SortService} from "../../../../../shared/services/sort.service";
import {AdminWorkingScheduleService} from "../../../services/admin-working-schedule.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-working-schedule-list',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './working-schedule-list.component.html',
  styleUrls: [
    './working-schedule-list.component.css',
    '../../../../../shared/components/list-component/list.component.css'
  ]
})
export class WorkingScheduleListComponent extends ListComponent<WorkingScheduleModel>  {

  constructor(private workingScheduleService: AdminWorkingScheduleService, protected router: Router, sortService: SortService) {
    super(sortService);
  }

  protected override getItems(): void {
    this.workingScheduleService.getPaged(this.pagedRequest).subscribe((response) => {
      this.items = response;
    });
  }

  public deleteWorkingSchedule(id: number){
    if (window.confirm('Подтвердите удаление')) {
      this.workingScheduleService.delete(id).subscribe((response) => {
        this.getItems();
      }, (error) => {
        console.error('Error deleting dentist:', error);
      });
    }
  }
}
