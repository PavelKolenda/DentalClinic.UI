import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {FooterComponent} from "./core/layout/footer/footer.component";
import {AuthService} from "./core/auth/services/auth.service";
import {JwtService} from "./core/auth/services/jwt.service";
import {HeaderComponent} from "./core/layout/header/header.component";
import {AppointmentService} from "./features/appointments/services/appointment.service";
import {DentistsService} from "./features/dentist-panel/services/dentists.service";
import {NgxMaskDirective, NgxMaskPipe, provideNgxMask} from "ngx-mask";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    FooterComponent,
    HeaderComponent,
    NgxMaskDirective,
    NgxMaskPipe
  ],
  providers: [AuthService, JwtService, AppointmentService, DentistsService, provideNgxMask()],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(){}
}
