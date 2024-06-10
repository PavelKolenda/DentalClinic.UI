import {Component} from '@angular/core';
import {AdminDentistsService} from "../../../services/admin-dentists.service";
import {Router} from "@angular/router";
import {Dentist} from "../../../../appointments/models/dentist";
import {FormsModule} from "@angular/forms";
import {SortService} from "../../../../../shared/services/sort.service";
import { ListComponent } from '../../../../../shared/components/list-component/list.component';

@Component({
  selector: 'app-dentists-list',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './dentists-list.component.html',
  styleUrls: [
    './dentists-list.component.css',
    '../../../../../shared/components/list-component/list.component.css'
  ]
})
export class DentistsListComponent extends ListComponent<Dentist>  {

  constructor(private adminService: AdminDentistsService, private router: Router, sortService: SortService) {
    super(sortService);
  }

  protected getItems(): void {
    this.adminService.getDentist(this.pagedRequest).subscribe((response) => {
      this.items = response;
    });
  }

  public deleteDentist(id: number){
    if (window.confirm('Вы уверены что хотите удалить?')) {
      this.adminService.deleteDentist(id).subscribe((response) => {
        this.getItems();
      }, (error) => {
        console.error('Error deleting dentist:', error);
      });
    }
  }
}
