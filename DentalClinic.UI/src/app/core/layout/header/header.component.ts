import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../auth/services/auth.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [
    RouterLink
  ],
  standalone: true
})
export class HeaderComponent{

  constructor(public authService: AuthService) {

  }

  logout(){
    this.authService.logout();
  }
}
