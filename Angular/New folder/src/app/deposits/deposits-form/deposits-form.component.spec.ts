import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositsFormComponent } from './deposits-form.component';

describe('DepositsFormComponent', () => {
  let component: DepositsFormComponent;
  let fixture: ComponentFixture<DepositsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepositsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepositsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
