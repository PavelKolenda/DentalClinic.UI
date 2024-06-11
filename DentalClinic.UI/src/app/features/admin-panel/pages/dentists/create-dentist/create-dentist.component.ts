import {Component, OnInit} from '@angular/core';
import {AdminDentistsService} from "../../../services/admin-dentists.service";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AppointmentService} from "../../../../appointments/services/appointment.service";
import {DentistCreateModel} from "../../../models/dentist/dentist-create.model";
import {Specialization} from "../../../../appointments/models/specialization";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-create-dentist',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './create-dentist.component.html',
  styleUrl: './create-dentist.component.css'
})
export class CreateDentistComponent implements OnInit{

  specializations: Specialization[] | null = null;

  public dentistCreateForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    surname: new FormControl('', [Validators.required, Validators.minLength(2)]),
    patronymic: new FormControl(''),
    birthDate: new FormControl('', [Validators.required]),
    cabinetNumber: new FormControl('', [
      Validators.required,
      Validators.min(1),
      Validators.max(25)
    ]),
    specialization: new FormControl('')
  });

  constructor(private dentistService: AdminDentistsService, private appointmentsService: AppointmentService) { }

  ngOnInit(): void {
    this.appointmentsService.getSpecializations().subscribe((response) => {
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
      birthDate: formValues.birthDate!
    };

    console.log(dentist);

    this.dentistService.createDentist(dentist).subscribe({
      next: (response) => {
        this.clearForm();
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 400 && error.error && error.error.errors) {
          console.log(error.error.errors);
        }
      }
    });
  }

  private clearForm(): void {
    this.dentistCreateForm.reset();
  }
}
