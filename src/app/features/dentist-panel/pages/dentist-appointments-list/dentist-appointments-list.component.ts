import {Component, OnInit} from '@angular/core';
import {DentistsService} from "../../services/dentists.service";
import {PagedRequest} from "../../../../shared/models/paged-request";
import {PagedResponse} from "../../../../shared/models/paged-response";
import {AppointmentDetails} from "../../../appointments/models/appointment-details";
import {FormsModule} from "@angular/forms";
import {DateToHHmmPipe} from "../../../../shared/DateToHHmmPipe";
import {Router} from "@angular/router";
import {AuthService} from "../../../../core/auth/services/auth.service";

@Component({
  selector: 'app-dentist-appointments-list',
  standalone: true,
  imports: [
    FormsModule,
    DateToHHmmPipe
  ],
  templateUrl: './dentist-appointments-list.component.html',
  styleUrl: './dentist-appointments-list.component.css'
})
export class DentistAppointmentsListComponent implements OnInit{

  constructor(private readonly dentistsService: DentistsService,
              private router: Router,
              private authService: AuthService) {}

  appointmentsDetails: PagedResponse<AppointmentDetails> | null = null;
  selectedDate: string = new Date().toISOString().split('T')[0];
  pagedRequest: PagedRequest = {
    page: 1,
    pageSize: 12,
    sortOrder: 0,
    sortColumn: ""
  }

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments(): void {
    const formattedDate = this.selectedDate.split('T')[0];

    this.dentistsService.getAppointmentsList(this.pagedRequest, formattedDate)
      .subscribe((response) => {
      this.appointmentsDetails = response;
    })
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

  patientReenrolment(patientId: number): void{
    let dentistId = this.authService.getDentistIdFromToken();
    this.router.navigateByUrl(`dentist/${dentistId}/${patientId}/patient-reenrollment`);
  }
}
