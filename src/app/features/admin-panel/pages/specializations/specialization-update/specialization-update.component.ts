import {Component, OnInit} from '@angular/core';
import {SpecializationsService} from "../../../services/specializations.service";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {SpecializationUpdateModel} from "../../../models/specializations/specialization-update.model";

@Component({
  selector: 'app-specialization-update',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './specialization-update.component.html',
  styleUrl: './specialization-update.component.css'
})
export class SpecializationUpdateComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private specializationsService: SpecializationsService,
              private route: ActivatedRoute) {
  }

  specialization: SpecializationUpdateModel | null = null;
  specializationId: number = 0;

  specializationForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
  });

  ngOnInit(): void {
    const specializationIdParams = this.route.snapshot.paramMap.get('specializationId');
    if (specializationIdParams) {
      this.specializationId = +specializationIdParams;
      this.specializationsService.getById(+specializationIdParams).subscribe((response) => {
        this.specialization = response;
        this.specializationForm.patchValue(this.specialization);
      });
    }
  }

  public update(): void {
    if (this.specialization === null || this.specializationForm.invalid) {
      return;
    }

    let updatedSpecialization: SpecializationUpdateModel = {
      name: this.specializationForm.controls.name.value!,
    }

    this.specializationsService.update(this.specializationId, updatedSpecialization)
      .subscribe((response) => {
        alert("Запись обновлена");
      });
  }
}
