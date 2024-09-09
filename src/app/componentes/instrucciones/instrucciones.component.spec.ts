import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstruccionesComponent } from './instrucciones.component';

describe('InstruccionesComponent', () => {
  let component: InstruccionesComponent;
  let fixture: ComponentFixture<InstruccionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstruccionesComponent]
    });
    fixture = TestBed.createComponent(InstruccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
