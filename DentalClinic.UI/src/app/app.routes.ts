import { Routes } from '@angular/router';
import {RegistrationComponent} from "./core/auth/registration/registration.component";
import {LoginComponent} from "./core/auth/login/login.component";

export const routes: Routes = [
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent }
];
