import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositsListComponent } from './deposits-list.component';

describe('DepositsListComponent', () => {
  let component: DepositsListComponent;
  let fixture: ComponentFixture<DepositsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepositsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepositsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
