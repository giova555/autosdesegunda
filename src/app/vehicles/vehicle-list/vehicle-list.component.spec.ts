import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';

import { VehicleListComponent } from './vehicle-list.component';
import { VehiclesService } from '../vehicles.service';
import { Vehiculo } from '../vehiculo';

describe('VehicleListComponent', () => {
  let component: VehicleListComponent;
  let fixture: ComponentFixture<VehicleListComponent>;

  // 1. Creamos un mock del servicio
  const mockVehicles: Vehiculo[] = [
    { id: 1, marca: 'Renault',   linea: 'Kangoo',  modelo: 2017 },
    { id: 2, marca: 'Chevrolet', linea: 'Spark',   modelo: 2018 },
    { id: 3, marca: 'Renault',   linea: 'Sandero', modelo: 2020 }
  ];

  const vehicleServiceMock = {
    getVehicles: () => of(mockVehicles)
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule], 
      declarations: [VehicleListComponent],
      providers: [
        { provide: VehiclesService, useValue: vehicleServiceMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  it('debería crearse', () => {
    expect(component).toBeTruthy();
  });

  it('debería cargar 3 vehículos desde el servicio mock', () => {
    expect(component.vehicles.length).toBe(3);
  });

  it('debería renderizar una tabla con 3 filas en el tbody', () => {
    const compiled: HTMLElement = fixture.nativeElement;
    const rows = compiled.querySelectorAll('tbody tr');
    expect(rows.length).toBe(3);
  });


});
