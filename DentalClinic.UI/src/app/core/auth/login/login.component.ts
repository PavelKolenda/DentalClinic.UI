import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: '../registration/registration.component.css'
})
export class LoginComponent {

  constructor(private authService: AuthService, private router: Router) {
  }


  public userLoginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  login() {
    if (!this.userLoginForm.valid) {
      return;
    }
    const formValues = this.userLoginForm.getRawValue();

    const credentials = Object.fromEntries(
      Object.entries(formValues).map(([key, value]) => [key, value ?? undefined])
    );
    const { email, password } = credentials;

    this.authService.login(email, password).subscribe((response)=> {
      this.authService.currentUserSignal.set(response);
      this.router.navigateByUrl('/')
    });
  }
}
