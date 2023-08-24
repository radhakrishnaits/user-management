import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiversListComponent } from './receiver-list.component';

describe('ReceiversListComponent', () => {
  let component: ReceiversListComponent;
  let fixture: ComponentFixture<ReceiversListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReceiversListComponent]
    });
    fixture = TestBed.createComponent(ReceiversListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
