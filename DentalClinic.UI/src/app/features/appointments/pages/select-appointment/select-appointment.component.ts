import {Component, OnInit} from '@angular/core';
import {AppointmentService} from "../../services/appointment.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../../core/auth/services/auth.service";
import {AvailableAppointments} from "../../models/available-appointments";
import {Appointment} from "../../models/appointment";
import {DatePipe, NgFor, NgIf} from "@angular/common";
import {AppointmentDetails} from "../../models/appointment-details";

@Component({
  selector: 'app-select-appointment',
  standalone: true,
  imports: [
    DatePipe, NgFor, NgIf
  ],
  templateUrl: './select-appointment.component.html',
  styleUrl: './select-appointment.component.css'
})
export class SelectAppointmentComponent implements OnInit {
  availableAppointments: AvailableAppointments[] = [];
  calendarDays: CalendarDay[] = [];
  selectedDay: CalendarDay | null = null;
  dentistId: number = 0;

  constructor(
    private appointmentService: AppointmentService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const dentistIdParams = this.route.snapshot.paramMap.get('dentistId');
    if (dentistIdParams) {
      this.dentistId = +dentistIdParams;
      this.getAvailableAppointments(this.dentistId);
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
    if(!this.authService.isLogin()) {
      this.router.navigateByUrl('login');
      return;
    }

    this.appointmentService.createAppointment(this.dentistId, appointmentId)
      .subscribe((appointmentInfo: AppointmentDetails) => {
        this.router.navigateByUrl(`/appointment/details/${appointmentInfo.appointmentId}`);
      });
  }
}


interface CalendarDay {
  date: Date;
  count: number;
  availableAppointments: Appointment[];
}
