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
  // aquí vamos a guardar los totales por marca
  brandTotals: { [marca: string]: number } = {};

  constructor(private vehiclesService: VehiclesService) {}

  ngOnInit(): void {
    this.vehiclesService.getVehicles()
      .subscribe(data => {
        this.vehicles = data;
        this.calculateBrandTotals();
      });
  }

  private calculateBrandTotals(): void {
    const totals: { [marca: string]: number } = {};

    this.vehicles.forEach(v => {
      const marca = v.marca;
      if (totals[marca]) {
        totals[marca] += 1;
      } else {
        totals[marca] = 1;
      }
    });

    this.brandTotals = totals;
  }
}
