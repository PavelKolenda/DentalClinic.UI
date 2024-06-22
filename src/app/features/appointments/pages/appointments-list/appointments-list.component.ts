import {Component, OnInit} from '@angular/core';
import {AppointmentService} from "../../services/appointment.service";
import {AppointmentDetails} from "../../models/appointment-details";
import {PagedResponse} from "../../../../shared/models/paged-response";
import {Router} from "@angular/router";
import {PagedRequest} from "../../../../shared/models/paged-request";
import {DatePipe, SlicePipe} from "@angular/common";

@Component({
  selector: 'app-appointments-list',
  standalone: true,
  imports: [
    DatePipe,
    SlicePipe
  ],
  templateUrl: './appointments-list.component.html',
  styleUrl: './appointments-list.component.css'
})
export class AppointmentsListComponent implements OnInit{

  constructor(private appointmentsService: AppointmentService, private router: Router) {}

  appointmentsDetails: PagedResponse<AppointmentDetails> | null = null;
  pagedRequest: PagedRequest = {
    page: 1,
    pageSize: 10,
    sortOrder: 0,
    sortColumn: ""
  }

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments(): void {
    this.appointmentsService.getAppointments(this.pagedRequest)
      .subscribe((response) => {
        this.appointmentsDetails = response;
      });
  }

  nextPage(): void {
    if (this.appointmentsDetails && this.appointmentsDetails.hasNextPage) {
      this.pagedRequest.page++;
      this.loadAppointments();
    }
  }

  previousPage(): void {
    if (this.appointmentsDetails && this.appointmentsDetails.hasPreviousPage) {
      this.pagedRequest.page--;
      this.loadAppointments();
    }
  }

  protected selectAppointment(appointmentId: number){
    this.router.navigateByUrl(`appointment/details/${appointmentId}`);
  }
}
