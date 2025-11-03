import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../vehiculo';
import { VehiclesService } from '../vehicles.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {

  vehicles: Vehiculo[] = [];

  constructor(private vehiclesService: VehiclesService) {}

  ngOnInit(): void {
    this.vehiclesService.getVehicles()
      .subscribe(data => this.vehicles = data);
  }
}
