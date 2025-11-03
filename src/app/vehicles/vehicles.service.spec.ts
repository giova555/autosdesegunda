import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { VehiclesService } from './vehicles.service';
import { Vehiculo } from './vehiculo';

describe('VehicleService', () => {
  let service: VehiclesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],  
      providers: [VehiclesService]
    });

    service = TestBed.inject(VehiclesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // asegura que no haya requests pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call the vehicles endpoint', () => {
    const dummyVehicles: Vehiculo[] = [
      { id: 1, marca: 'Renault', linea: 'Kangoo', modelo: 2017 },
      { id: 2, marca: 'Chevrolet', linea: 'Spark', modelo: 2018 }
    ];

    service.getVehicles().subscribe(data => {
      expect(data.length).toBe(2);
      expect(data[0].marca).toBe('Renault');
    });

    // aquí esperamos que el servicio haya hecho el GET a la url
    const req = httpMock.expectOne(
      'https://gist.githubusercontent.com/josejbocanegra/17bb8c76405e43655d551a90800c8a81/raw/d41b4acc3457e51e7533fad6d5e9925ee9676457/202212_MISW4104_Grupo1.json'
    );
    expect(req.request.method).toBe('GET');

    // respondemos con el dummy
    req.flush(dummyVehicles);
  });
});
