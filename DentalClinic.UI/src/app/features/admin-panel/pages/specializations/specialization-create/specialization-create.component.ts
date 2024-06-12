import { Component } from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {SpecializationsService} from "../../../services/specializations.service";
import {ActivatedRoute} from "@angular/router";
import {SpecializationCreateModel} from "../../../models/specializations/specialization-create.model";

@Component({
  selector: 'app-specialization-create',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './specialization-create.component.html',
  styleUrl: '../specialization-update/specialization-update.component.css'
})
export class SpecializationCreateComponent {

  constructor(private fb: FormBuilder,
              private specializationsService: SpecializationsService,
              private route: ActivatedRoute) {
  }

  specializationForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
  });

  public create(){
    const formValues = this.specializationForm.getRawValue();
    const specialization: SpecializationCreateModel = {
      name: formValues.name!
    };

    this.specializationsService.create(specialization).subscribe({
      next: (response) => {
        this.specializationForm.reset();
      }
    });
  }
}
