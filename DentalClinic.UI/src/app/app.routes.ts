import { Routes } from '@angular/router';
import {RegistrationComponent} from "./core/auth/registration/registration.component";
import {LoginComponent} from "./core/auth/login/login.component";
import {
  SelectSpecializationComponent
} from "./features/appointments/pages/select-specialization/select-specialization.component";
import {SelectDentistComponent} from "./features/appointments/pages/select-dentist/select-dentist.component";
import {
  SelectAppointmentComponent
} from "./features/appointments/pages/select-appointment/select-appointment.component";
import {
  AppointmentDetailsComponent
} from "./features/appointments/pages/appointment-details/appointment-details.component";
import {isLoggedGuard} from "./is-logged.guard";
import {AppointmentsListComponent} from "./features/appointments/pages/appointments-list/appointments-list.component";
import {
  DentistAppointmentsListComponent
} from "./features/dentist-panel/pages/dentist-appointments-list/dentist-appointments-list.component";
import {isDentistGuard} from "./is-dentist.guard";

export const routes: Routes = [
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'appointment', component: SelectSpecializationComponent },
  {
    path: 'appointment/details/:appointmentId',
    component: AppointmentDetailsComponent,
    canActivate: [isLoggedGuard]
  },
  {
    path: 'appointments',
    component: AppointmentsListComponent,
    canActivate: [isLoggedGuard]
  },
  {
    path: 'dentist/appointments-list',
    component: DentistAppointmentsListComponent,
    canActivate: [isLoggedGuard, isDentistGuard]
  },
  { path: 'appointment/:specializationId', component: SelectDentistComponent },
  { path: 'appointment/:specializationId/:dentistId', component: SelectAppointmentComponent }
];
