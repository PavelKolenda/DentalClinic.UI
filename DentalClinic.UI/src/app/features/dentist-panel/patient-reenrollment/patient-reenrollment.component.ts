import {Component, OnInit} from '@angular/core';
import {SelectAppointmentComponent} from "../../appointments/pages/select-appointment/select-appointment.component";
import {DatePipe} from "@angular/common";
import {AvailableAppointments} from "../../appointments/models/available-appointments";
import {AppointmentService} from "../../appointments/services/appointment.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../core/auth/services/auth.service";
import {AppointmentDetails} from "../../appointments/models/appointment-details";
import {Appointment} from "../../appointments/models/appointment";

@Component({
  selector: 'app-patient-reenrollment',
  standalone: true,
  imports: [
    SelectAppointmentComponent,
    DatePipe
  ],
  templateUrl: './patient-reenrollment.component.html',
  styleUrls: [
    './patient-reenrollment.component.css',
    './../../../features/appointments/pages/select-appointment/select-appointment.component.css'
    ]
})
export class PatientReenrollmentComponent implements OnInit{
  availableAppointments: AvailableAppointments[] = [];
  calendarDays: CalendarDay[] = [];
  selectedDay: CalendarDay | null = null;
  dentistId: number = 0;
  patientId: number = 0;

  constructor(
    private appointmentService: AppointmentService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const dentistIdParams = this.route.snapshot.paramMap.get('dentistId');
    const patientIdParams = this.route.snapshot.paramMap.get('patientId')
    if (dentistIdParams) {
      this.dentistId = +dentistIdParams;
      this.getAvailableAppointments(this.dentistId);
    }

    if(patientIdParams){
      this.patientId = +patientIdParams;
    }
  }

  getAvailableAppointments(dentistId: number): void {
    this.appointmentService.getAvailableAppointments(dentistId)
      .subscribe((response) => {
        this.availableAppointments = response;
        this.generateCalendar();
      });
  }

  generateCalendar(): void {
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const day = { date, count: 0, availableAppointments: [] };
      this.calendarDays.push(day);
    }

    this.calendarDays.forEach(day => {
      const availableDay = this.availableAppointments.find(app =>
        new Date(app.date).toDateString() === day.date.toDateString()
      );
      if (availableDay) {
        day.count = availableDay.count;
        day.availableAppointments = availableDay.availableAppointments;
      }
    });
  }

  showAppointments(day: CalendarDay): void {
    this.selectedDay = day;
  }

  selectAppointment(appointmentId: number): void {
    this.appointmentService.patientReenrollment(this.patientId, appointmentId)
      .subscribe((appointmentInfo: AppointmentDetails) => {
        alert('Пациент записан!');
        this.router.navigateByUrl(`dentist/appointments-list`);
      });
  }
}


interface CalendarDay {
  date: Date;
  count: number;
  availableAppointments: Appointment[];
}
