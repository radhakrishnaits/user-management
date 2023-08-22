import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBeneficiaryComponent } from './add-beneficiary.component';

describe('AddBeneficiaryComponent', () => {
  let component: AddBeneficiaryComponent;
  let fixture: ComponentFixture<AddBeneficiaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddBeneficiaryComponent]
    });
    fixture = TestBed.createComponent(AddBeneficiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
