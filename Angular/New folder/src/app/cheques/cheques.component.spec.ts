import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChequesComponent } from './cheques.component';

describe('ChequesListComponent', () => {
  let component: ChequesComponent;
  let fixture: ComponentFixture<ChequesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChequesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChequesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
