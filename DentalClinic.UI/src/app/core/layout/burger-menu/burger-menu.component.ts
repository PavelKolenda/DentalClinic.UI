import { Component } from '@angular/core';
import {AuthService} from "../../auth/services/auth.service";
import {NgClass, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-burger-menu',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    NgClass
  ],
  templateUrl: './burger-menu.component.html',
  styleUrl: './burger-menu.component.css'
})
export class BurgerMenuComponent {
  isOpen = false;

  constructor(public authService: AuthService) {}

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  logout() {
    this.authService.logout();
  }
}
