import {Component} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  standalone: true,
})
export class RegistrationComponent {
  today = new Date().toISOString().split('T')[0];

  constructor(private authService: AuthService, private router: Router) {
  }

  public userRegistrationForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    surname: new FormControl('', [Validators.required, Validators.minLength(2)]),
    patronymic: new FormControl(''),
    birthDate: new FormControl('', [Validators.required])
  });

  submitForm() {
    if (!this.userRegistrationForm.valid) {
      return;
    }

    const formValues = this.userRegistrationForm.getRawValue();

    const credentials = Object.fromEntries(
      Object.entries(formValues).map(([key, value]) => [key, value ?? undefined])
    );
    const {email, password, name, surname, patronymic, birthDate} = credentials;

    this.authService.register(email, password, name, surname, patronymic, birthDate)
      .subscribe((response) => {
        this.authService.currentUserSignal.set(response);
        this.router.navigateByUrl('/');
      });
  }
}
