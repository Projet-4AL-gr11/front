import {Injectable, Injector} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {AuthService} from "../services/auth/auth.service";
import {Router} from "@angular/router";
import {catchError, Observable, throwError} from "rxjs";

@Injectable()
export class GlobalHttpInterceptor implements HttpInterceptor {
  authService: AuthService;

  constructor(private router: Router, private inj: Injector) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      request = request.clone({
        withCredentials: true,
      });

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.authService = this.inj.get(AuthService)
            this.authService.logout().then();
            this.router.navigateByUrl("auth/login")
          }
          return throwError(error);
        }
      ));
  }
}
