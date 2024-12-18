import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroEmpleadoresInicioComponent } from './registro-empleadores-inicio.component';

describe('RegistroEmpleadoresInicioComponent', () => {
  let component: RegistroEmpleadoresInicioComponent;
  let fixture: ComponentFixture<RegistroEmpleadoresInicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroEmpleadoresInicioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistroEmpleadoresInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
