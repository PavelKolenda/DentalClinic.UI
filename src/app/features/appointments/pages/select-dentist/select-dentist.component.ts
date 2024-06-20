import {Component, OnInit} from '@angular/core';
import {AppointmentService} from "../../services/appointment.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Dentist} from "../../models/dentist";
import {response} from "express";

@Component({
  selector: 'app-select-dentist',
  standalone: true,
  imports: [],
  templateUrl: './select-dentist.component.html',
  styleUrls: ['./select-dentist.component.css' ]
})
export class SelectDentistComponent implements OnInit{
  constructor(private appointmentService: AppointmentService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const specializationId = this.route.snapshot.paramMap.get('specializationId');
    if (specializationId) {
      this.getDentists(+specializationId);
    }
  }

  dentists: Dentist[] = [];

  private getDentists(specializationId: number){
    this.appointmentService.getDentists(specializationId)
      .subscribe((response) => {
        this.dentists = response;
      });
  }

  public selectDentist(id: number){
    this.router.navigate([`${id}`], { relativeTo: this.route });
  }
}
