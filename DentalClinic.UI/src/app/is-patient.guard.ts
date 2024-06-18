import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "./core/auth/services/auth.service";

export const isPatientGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isPatient()) {
    router.navigate([''])
    return false;
  }

  return true;
};
