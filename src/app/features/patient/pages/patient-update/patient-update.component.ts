import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../core/auth/services/auth.service";
import {PatientsService} from "../../../admin-panel/services/patients.service";
import {PatientModel} from "../../../admin-panel/models/patients/patient.model";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {PatientUpdateModel} from "../../models/patient-update.model";
import {HttpErrorResponse} from "@angular/common/http";
import {
  RegistrationUserFriendlyErrorMessages
} from "../../../../core/auth/errors/RegistrationUserFriendlyErrorMessages";
import {NgxMaskDirective} from "ngx-mask";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-patient-update',
  standalone: true,
  imports: [
    NgxMaskDirective,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './patient-update.component.html',
  styleUrls: [
    './patient-update.component.css',
    './../../../../core/auth/registration/registration.component.css'
  ]
})
export class PatientUpdateComponent implements OnInit{
  constructor(private authService: AuthService, private patientService: PatientsService) {
  }
  today = new Date().toISOString().split('T')[0];
  patient: PatientModel | null = null;
  patientId: number = 0;

  public patientUpdateForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl(''),
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    surname: new FormControl('', [Validators.required, Validators.minLength(2)]),
    patronymic: new FormControl(''),
    birthDate: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('',[Validators.required])
  });

  ngOnInit(): void {
    this.patientId = Number(this.authService.getPatientIdFromToken());
      this.patientService.getById(this.patientId).subscribe((response) => {
        this.patient = response;
        console.log(this.patient);
        this.patientUpdateForm.patchValue(this.patient);
      });
  }

  public update(): void {
    if (this.patientUpdateForm === null || this.patientUpdateForm.invalid) {
      return;
    }

    const formValues = this.patientUpdateForm.getRawValue();

    let updatedDentist: PatientUpdateModel = {
      name: formValues.name!,
      surname: formValues.surname!,
      patronymic: formValues.patronymic!,
      email: formValues.email!,
      password: formValues.password!,
      birthDate: formValues.birthDate!,
      address: formValues.address!,
      phoneNumber: '+375' + formValues.phoneNumber!
    };

    this.patientService.update(this.patientId, updatedDentist).subscribe({
      next: (response) => {
        alert('Обновлено');
      },
      error: (error: HttpErrorResponse) => {
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
    })
  }

  public errorMessages: { [key: string]: string } = {};

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
}
