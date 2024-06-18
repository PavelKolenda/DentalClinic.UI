import { Component } from '@angular/core';
import {ListComponent} from "../../../../../shared/components/list-component/list.component";
import {PatientModel} from "../../../models/patients/patient.model";
import {Router} from "@angular/router";
import {SortService} from "../../../../../shared/services/sort.service";
import {PatientsService} from "../../../services/patients.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-patients-list',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './patients-list.component.html',
  styleUrls: [
    './patients-list.component.css',
    '../../../../../shared/components/list-component/list.component.css'
  ]
})
export class PatientsListComponent extends ListComponent<PatientModel> {

  constructor(private patientService: PatientsService, private router: Router, sortService: SortService) {
    super(sortService);
  }

  protected override getItems(): void {
    this.patientService.getPaged(this.pagedRequest).subscribe((response) => {
      this.items = response;
    });
  }

  public delete(id: number){
    if (window.confirm('Вы уверены что хотите удалить?')) {
      this.patientService.delete(id).subscribe((response) => {
        this.getItems();
      }, (error) => {
        console.error('Error deleting patient', error);
      });
    }
  }
}
