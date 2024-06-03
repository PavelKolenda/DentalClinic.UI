import {Component} from '@angular/core';
import {AppointmentService} from "../../services/appointment.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AppointmentDetails} from "../../models/appointment-details";

@Component({
  selector: 'app-appointment-details',
  standalone: true,
  imports: [],
  templateUrl: './appointment-details.component.html',
  styleUrl: './appointment-details.component.css'
})
export class AppointmentDetailsComponent {
  appointmentId: number = 0;
  appointmentDetails: AppointmentDetails | null = null;

  constructor(private appointmentService: AppointmentService,
              private router: Router,
              private route: ActivatedRoute)
  {
  }

  ngOnInit(): void {
    const appointmentIdParams = this.route.snapshot.paramMap.get('appointmentId');
    if (appointmentIdParams) {
      this.appointmentId = +appointmentIdParams;
      this.getAppointmentDetails(this.appointmentId);
    }
  }

  private getAppointmentDetails(appointmentId: number): void {
    this.appointmentService.getAppointmentDetails(appointmentId)
      .subscribe((response: AppointmentDetails) => {
        this.appointmentDetails = response;
      },error => {
        this.router.navigateByUrl('');
      });
  }
}
