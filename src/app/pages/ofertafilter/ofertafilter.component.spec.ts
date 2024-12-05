import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfertafilterComponent } from './ofertafilter.component';

describe('OfertafilterComponent', () => {
  let component: OfertafilterComponent;
  let fixture: ComponentFixture<OfertafilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfertafilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OfertafilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
