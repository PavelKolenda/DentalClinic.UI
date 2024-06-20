import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "./core/auth/services/auth.service";

export const isDentistGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (!authService.isDentist()) {
    router.navigate([''])
    return false;
  }
  return true;
};
