import {Component, OnInit} from '@angular/core';
import {NotificationsService} from "../../services/notifications.service";
import {NotificationModel} from "../../models/notification.model";
import {ListComponent} from "../../../../shared/components/list-component/list.component";
import {SortService} from "../../../../shared/services/sort.service";
import {DatePipe} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [
    DatePipe,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './notifications.component.html',
  styleUrls: [
    './notifications.component.css',
    './../../../../shared/components/list-component/list.component.css',
  ]
})
export class NotificationsComponent extends ListComponent<NotificationModel>{

  constructor(private notificationsService: NotificationsService, sortService: SortService) {
    super(sortService);
  }

  protected override getItems(): void {
    this.notificationsService.getPaged(this.pagedRequest).subscribe((response) => {
      this.items = response;
    });
  }

}
