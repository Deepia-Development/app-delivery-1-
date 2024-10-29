import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnviosPendientesComponent } from './envios-pendientes.component';

describe('EnviosPendientesComponent', () => {
  let component: EnviosPendientesComponent;
  let fixture: ComponentFixture<EnviosPendientesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnviosPendientesComponent]
    });
    fixture = TestBed.createComponent(EnviosPendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
