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

  cancelAppointment(appointmentId: number){
    if (window.confirm('Вы уверены что хотите отменить запись?')) {
      this.appointmentService.cancelAppointment(appointmentId)
        .subscribe((response) => {
          this.router.navigateByUrl('/appointments')
        }, (error) => {
          console.error('Error deleting dentist:', error);
        });
    }
  }

  public downloadPdf(): void {
    this.appointmentService.downloadAppointmentInfoPdf(this.appointmentId)
      .subscribe((blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.download = `appointment.pdf`;
        anchor.href = url;
        anchor.click();
        window.URL.revokeObjectURL(url);
      }, error => {
        console.error('Error downloading the file');
      });
  }
}
