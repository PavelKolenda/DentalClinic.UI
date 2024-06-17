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
import {DentistsListComponent} from "./features/admin-panel/pages/dentists/dentists-list/dentists-list.component";
import {
  DentistWorkingScheduleComponent
} from "./features/admin-panel/pages/dentists/working-schedule/dentist-working-schedule/dentist-working-schedule.component";
import {PatientsListComponent} from "./features/admin-panel/pages/patients/patients-list/patients-list.component";
import {CreateDentistComponent} from "./features/admin-panel/pages/dentists/create-dentist/create-dentist.component";
import {
  SpecializationsListComponent
} from "./features/admin-panel/pages/specializations/specializations-list/specializations-list.component";
import {
  SpecializationUpdateComponent
} from "./features/admin-panel/pages/specializations/specialization-update/specialization-update.component";
import {
  SpecializationCreateComponent
} from "./features/admin-panel/pages/specializations/specialization-create/specialization-create.component";
import {
  WorkingScheduleListComponent
} from "./features/admin-panel/pages/working-schedule/working-schedule-list/working-schedule-list.component";
import {
  WorkingScheduleUpdateComponent
} from "./features/admin-panel/pages/working-schedule/working-schedule-update/working-schedule-update.component";
import {
  WorkingScheduleCreateComponent
} from "./features/admin-panel/pages/working-schedule/working-schedule-create/working-schedule-create.component";
import {AdminPanelComponent} from "./features/admin-panel/admin-panel/admin-panel.component";
import {DentistUpdateComponent} from "./features/admin-panel/pages/dentists/dentist-update/dentist-update.component";

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
  {
    path: 'admin',
    component: AdminPanelComponent
  },
  {
    path: 'admin/dentists-list',
    component: DentistsListComponent
  },
  {
    path: 'admin/dentist/:dentistId/working-schedule',
    component: DentistWorkingScheduleComponent
  },
  {
    path: 'admin/patients-list',
    component: PatientsListComponent
  },
  {
    path: 'admin/dentist/create',
    component: CreateDentistComponent
  },
  {
    path: 'admin/dentist/:dentistId/update',
    component: DentistUpdateComponent
  },
  {
    path: 'admin/specializations-list',
    component: SpecializationsListComponent
  },
  {
    path: 'admin/specializations/:specializationId/update',
    component: SpecializationUpdateComponent
  },
  {
    path: 'admin/specializations/create',
    component: SpecializationCreateComponent
  },
  {
    path: 'admin/working-schedule-list',
    component: WorkingScheduleListComponent
  },
  {
    path: 'admin/working-schedule/:workingScheduleId/update',
    component: WorkingScheduleUpdateComponent
  },
  {
    path: 'admin/working-schedule/create',
    component: WorkingScheduleCreateComponent
  },
  { path: 'appointment/:specializationId', component: SelectDentistComponent },
  { path: 'appointment/:specializationId/:dentistId', component: SelectAppointmentComponent }
];
