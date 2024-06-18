import {Component, OnInit} from '@angular/core';
import {AdminDentistsService} from "../../../services/admin-dentists.service";
import {AppointmentService} from "../../../../appointments/services/appointment.service";
import {Specialization} from "../../../../appointments/models/specialization";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {DentistUpdateModel} from "../../../models/dentist/dentist-update-model";
import {WorkingScheduleUpdateModel} from "../../../models/working-schedule/working-schedule-update.model";
import {HttpErrorResponse} from "@angular/common/http";
import {CreateDentistErrorMessages} from "../create-dentist/create-dentist-error-messages";
import {NgxMaskDirective} from "ngx-mask";

@Component({
  selector: 'app-dentist-update',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective
  ],
  templateUrl: './dentist-update.component.html',
  styleUrls: [
    './dentist-update.component.css',
    './../create-dentist/create-dentist.component.css'
    ]
})
export class DentistUpdateComponent implements OnInit{

  specializations: Specialization[] | null = null;
  dentistId: number = 0;
  constructor(private dentistService: AdminDentistsService,
              private appointmentsService: AppointmentService,
              private route: ActivatedRoute) { }

  dentist: DentistUpdateModel | null = null;

  public errorMessages: { [key: string]: string } = {};
  private userFriendlyMessages: CreateDentistErrorMessages = {
    BirthDate: 'Врач должен быть старше 18 лет и младше 60.',
    CabinetNumber: 'Номер кабинета от 1 до 26',
    EmailExists: 'Aдрес электронной почты уже существует.'
  };


  ngOnInit(): void {
    this.appointmentsService.getSpecializations().subscribe(
      (response) => {
        this.specializations = response.items;
      });

    const dentistIdParams = this.route.snapshot.paramMap.get('dentistId');
    if (dentistIdParams) {
      this.dentistId = +dentistIdParams;
      this.dentistService.getDentistAsUser(this.dentistId).subscribe((response) => {
        this.dentist = response;
        this.dentistUpdateForm.patchValue(this.dentist);
      });
    }
  }

  public dentistUpdateForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    surname: new FormControl('', [Validators.required, Validators.minLength(2)]),
    patronymic: new FormControl(''),
    specialization: new FormControl(''),
    cabinetNumber: new FormControl('', [Validators.required, Validators.min(1), Validators.max(26)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.minLength(8)]),
    birthDate: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required])
  });

  public update(): void {
    if (this.dentistUpdateForm === null || this.dentistUpdateForm.invalid) {
      return;
    }

    const formValues = this.dentistUpdateForm.getRawValue();

    let updatedDentist: DentistUpdateModel = {
      name: formValues.name!,
      surname: formValues.surname!,
      patronymic: formValues.patronymic!,
      cabinetNumber: formValues.cabinetNumber!,
      specialization: formValues.specialization!,
      email: formValues.email!,
      password: formValues.password!,
      birthDate: formValues.birthDate!,
      address: formValues.address!,
      phoneNumber: '+375' + formValues.phoneNumber!
    };

    this.dentistService.updateDentist(this.dentistId, updatedDentist).subscribe({
      next: (response) => {
        alert("Обновлено")
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
}
