import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiaryListComponent } from './beneficiary-list.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTab, MatTabGroup } from '@angular/material/tabs';

describe('BeneficiaryListComponent', () => {
  let component: BeneficiaryListComponent;
  let fixture: ComponentFixture<BeneficiaryListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BeneficiaryListComponent,MatTab,MatTabGroup],
      providers:[MatDialog]
    });
    fixture = TestBed.createComponent(BeneficiaryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
