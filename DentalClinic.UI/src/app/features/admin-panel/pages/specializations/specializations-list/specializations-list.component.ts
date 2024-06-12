import { Component } from '@angular/core';
import {ListComponent} from "../../../../../shared/components/list-component/list.component";
import {Specialization} from "../../../../appointments/models/specialization";
import {Router} from "@angular/router";
import {SortService} from "../../../../../shared/services/sort.service";
import {SpecializationsService} from "../../../services/specializations.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-specializations-list',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './specializations-list.component.html',
  styleUrls: [
    './specializations-list.component.css',
    '../../../../../shared/components/list-component/list.component.css'
  ]
})
export class SpecializationsListComponent extends ListComponent<Specialization> {

  constructor(private specializationsService: SpecializationsService,
              private router: Router,
              sortService: SortService) {
    super(sortService);
  }

  protected override getItems(): void {
    this.specializationsService.getPaged(this.pagedRequest).subscribe((response) => {
      this.items = response;
    });
  }

  public delete(id: number){
    if (window.confirm('Вы уверены что хотите удалить?')) {
      this.specializationsService.delete(id).subscribe((response) => {
        this.getItems();
      }, (error) => {
        console.error('Error deleting dentist:', error);
      });
    }
  }

  public update(id:number){
    this.router.navigateByUrl(`/admin/specializations/${id}/update`);
  }

  public create(){
    this.router.navigateByUrl(`/admin/specializations/create`);
  }
}
