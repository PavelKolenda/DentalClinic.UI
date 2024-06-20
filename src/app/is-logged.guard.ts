import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from "./core/auth/services/auth.service";
import {inject} from "@angular/core";

export const isLoggedGuard: CanActivateFn = (route, state) => {
  if(!inject(AuthService).isLogin()){
    inject(Router).navigate(['/login']);
    return false;
  }
  return true;
};
