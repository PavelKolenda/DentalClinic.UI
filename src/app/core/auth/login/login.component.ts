import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {HttpErrorResponse} from "@angular/common/http";
import {LoginUserFriendlyErrorMessages} from "../errors/LoginUserFriendlyErrorMessages";

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
export class LoginComponent implements OnInit{

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    if(this.authService.isLogin()){
      this.router.navigateByUrl('');
    }
  }

  public errorMessages: { [key: string]: string } = {};
  private userFriendlyMessages: LoginUserFriendlyErrorMessages = {
    CredentialsDontExists: "Проверьте правильность введенных значений."
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

    this.authService.login(email, password).subscribe({
      next: (response) => {
        this.errorMessages = {};
        this.authService.currentUserSignal.set(response);
        this.router.navigateByUrl('/');
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessages = {};
        if (error.status === 400 && error.error) {
          if (error.error.detail && error.error.detail.includes("provided credentials don't exists")) {
            this.errorMessages['CredentialsDontExists'] = this.userFriendlyMessages['CredentialsDontExists'];
          }
        }
      }
    });
  }

  onPasswordInput() {
    if (this.errorMessages['CredentialsDontExists']) {
      this.errorMessages['CredentialsDontExists'] = '';
    }
  }
}
