import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {FooterComponent} from "./core/layout/footer/footer.component";
import {AuthService} from "./core/auth/services/auth.service";
import {JwtService} from "./core/auth/services/jwt.service";
import {AuthResponse} from "./core/auth/models/AuthResponse";
import {HeaderComponent} from "./core/layout/header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, FooterComponent, HeaderComponent,],
  providers: [AuthService, JwtService,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService, private httpClient: HttpClient) {

  }

  ngOnInit(): void {
    this.httpClient.get<AuthResponse>('https://localhost:7098/api/auth')
      .subscribe((response) => {
        this.authService.currentUserSignal.set(response);
      });
  }
}
