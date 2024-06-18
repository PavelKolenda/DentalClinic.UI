import {Component, OnInit} from '@angular/core';
import {AdminDentistsService} from "../../../services/admin-dentists.service";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AppointmentService} from "../../../../appointments/services/appointment.service";
import {DentistCreateModel} from "../../../models/dentist/dentist-create.model";
import {Specialization} from "../../../../appointments/models/specialization";
import {HttpErrorResponse} from "@angular/common/http";
import {CreateDentistErrorMessages} from "./create-dentist-error-messages";
import {NgxMaskDirective} from "ngx-mask";

@Component({
  selector: 'app-create-dentist',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, NgxMaskDirective],
  templateUrl: './create-dentist.component.html',
  styleUrl: './create-dentist.component.css'
})
export class CreateDentistComponent implements OnInit {

  specializations: Specialization[] | null = null;

  public dentistCreateForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    surname: new FormControl('', [Validators.required, Validators.minLength(2)]),
    patronymic: new FormControl(''),
    birthDate: new FormControl('', [Validators.required]),
    cabinetNumber: new FormControl('', [Validators.required, Validators.min(1), Validators.max(26)]),
    specialization: new FormControl(''),
    address: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required])
  });

  public errorMessages: { [key: string]: string } = {};
  private userFriendlyMessages: CreateDentistErrorMessages = {
    BirthDate: 'Врач должен быть старше 18 лет и младше 60.',
    CabinetNumber: 'Номер кабинета от 1 до 26',
    EmailExists: 'Aдрес электронной почты уже существует.'
  };

  constructor(private dentistService: AdminDentistsService, private appointmentsService: AppointmentService) {
  }

  ngOnInit(): void {
    this.appointmentsService.getSpecializations().subscribe(
      (response) => {
      this.specializations = response.items;
    });
  }

  submit(): void {
    if (!this.dentistCreateForm.valid) {
      return;
    }

    const formValues = this.dentistCreateForm.getRawValue();

    const dentist: DentistCreateModel = {
      name: formValues.name!,
      surname: formValues.surname!,
      patronymic: formValues.patronymic!,
      cabinetNumber: Number(formValues.cabinetNumber),
      specialization: formValues.specialization!,
      email: formValues.email!,
      password: formValues.password!,
      birthDate: formValues.birthDate!,
      address: formValues.address!,
      phoneNumber: '+375' + formValues.phoneNumber!
    };

    console.log(dentist);

    this.dentistService.createDentist(dentist).subscribe({
      next: (response) => {
        this.clearForm();
      }, error: (error: HttpErrorResponse) => {
        this.errorMessages = {};
        if (error.status === 400 && error.error) {
          if (error.error.detail && error.error.detail.includes('already exists')) {
            this.errorMessages['EmailExists'] = this.userFriendlyMessages['EmailExists'];
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

  private clearForm(): void {
    this.dentistCreateForm.reset();
  }
}
