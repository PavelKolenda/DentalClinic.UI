import {HttpInterceptorFn} from "@angular/common/http";

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  let token = '';
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('jwtToken') ?? '';
  }
  request = request.clone({
    setHeaders: {
      Authorization: token ? `Bearer ${token}` : '',
    }
  });

  return next(request);
}
