import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyReceiverComponent } from './modify-receiver.component';

describe('ModifyReceiverComponent', () => {
  let component: ModifyReceiverComponent;
  let fixture: ComponentFixture<ModifyReceiverComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifyReceiverComponent]
    });
    fixture = TestBed.createComponent(ModifyReceiverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
