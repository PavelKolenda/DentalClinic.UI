import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {NgxMaskDirective} from "ngx-mask";
import {HttpErrorResponse} from "@angular/common/http";
import {RegistrationUserFriendlyErrorMessages} from "../errors/RegistrationUserFriendlyErrorMessages";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  imports: [RouterLink, ReactiveFormsModule, NgxMaskDirective,],
  standalone: true,
})
export class RegistrationComponent implements OnInit{
  today = new Date().toISOString().split('T')[0];

  public errorMessages: { [key: string]: string } = {};

  public userRegistrationForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    surname: new FormControl('', [Validators.required, Validators.minLength(2)]),
    patronymic: new FormControl(''),
    birthDate: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('',[Validators.required])
  });

  private userFriendlyMessages: RegistrationUserFriendlyErrorMessages = {
    Name: 'Имя должно быть длиной не менее 2 символов.',
    Email: 'Введите корректный адрес электронной почты.',
    Address: 'Поле адреса обязательно для заполнения.',
    Surname: 'Фамилия должна быть длиной не менее 2 символов.',
    Password: 'Пароль должен быть длиной не менее 8 символов.',
    BirthDate: 'Пациент должен быть младше 18 лет.',
    PhoneNumber: 'Поле номера телефона обязательно для заполнения.',
    EmailExists: 'Aдрес электронной почты уже существует.'
  };

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    if(this.authService.isLogin()){
      this.router.navigateByUrl('');
    }
  }

  submitForm() {
    if (!this.userRegistrationForm.valid) {
      return;
    }

    const formValues = this.userRegistrationForm.getRawValue();
    formValues.phoneNumber = "+375" + formValues.phoneNumber!.replace(/\D/g, '');
    const credentials = Object.fromEntries(Object.entries(formValues)
      .map(([key, value]) => [key, value ?? undefined]));

    const {email, password, name, surname, patronymic, birthDate, address, phoneNumber} = credentials;

    this.authService.register(email, password, name, surname, patronymic, birthDate, phoneNumber, address)
      .subscribe({
        next: (response) => {
          this.errorMessages = {};
          this.authService.currentUserSignal.set(response);
          this.router.navigateByUrl('/');
        }, error: (error: HttpErrorResponse) => {
          this.errorMessages = {};
          if (error.status === 400 && error.error) {
            if (error.error.detail && error.error.detail.includes('already exists')) {
              this.errorMessages['Email'] = this.userFriendlyMessages['EmailExists'];
            }

            if (error.error.errors) {
              for (const key in error.error.errors) {
                if (this.userFriendlyMessages[key]) {
                  this.errorMessages[key] = this.userFriendlyMessages[key];
                }
              }
            }
          }
        }
      });
  }
}
