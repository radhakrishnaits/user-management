import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyBeneficiaryComponent } from './modify-beneficiary.component';

describe('ModifyBeneficiaryComponent', () => {
  let component: ModifyBeneficiaryComponent;
  let fixture: ComponentFixture<ModifyBeneficiaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifyBeneficiaryComponent]
    });
    fixture = TestBed.createComponent(ModifyBeneficiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
