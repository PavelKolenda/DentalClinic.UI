import {Component, OnInit} from '@angular/core';
import {AppointmentService} from "../../services/appointment.service";
import {Specialization} from "../../models/specialization";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-select-specialization',
  standalone: true,
  imports: [],
  templateUrl: './select-specialization.component.html',
  styleUrl: './select-specialization.component.css'
})
export class SelectSpecializationComponent implements OnInit {

  constructor(private appointmentService: AppointmentService,
              private router: Router,
              private route: ActivatedRoute) { }
  specializations: Specialization[] = [];

  ngOnInit() {
    this.getSpecializations();
  }

  public getSpecializations(){
    this.appointmentService.getSpecializations().subscribe(response =>{
      this.specializations = response.items;
    });
  }

  selectSpecialization(id: number){
    this.router.navigate([`${id}`], { relativeTo: this.route });
  }
}
