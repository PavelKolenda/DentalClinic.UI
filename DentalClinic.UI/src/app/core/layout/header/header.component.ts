import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../auth/services/auth.service";
import {RouterLink} from "@angular/router";
import {BurgerMenuComponent} from "../burger-menu/burger-menu.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [
    RouterLink,
    BurgerMenuComponent,
    NgIf
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
