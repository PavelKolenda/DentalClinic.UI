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

export const routes: Routes = [
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'appointment', component: SelectSpecializationComponent },
  {
    path: 'appointment/details/:appointmentId',
    component: AppointmentDetailsComponent,
    canActivate: [isLoggedGuard]
  },
  { path: 'appointment/:specializationId', component: SelectDentistComponent },
  { path: 'appointment/:specializationId/:dentistId', component: SelectAppointmentComponent }
];
