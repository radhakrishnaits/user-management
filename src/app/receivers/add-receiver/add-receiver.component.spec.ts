import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReceiverComponent } from './add-receiver.component';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { ReceiversAPI } from '../receivers.api';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReceiversModule } from '../receivers.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpHeaders } from '@angular/common/http';

describe('AddReceiverComponent', () => {
  let component: AddReceiverComponent;
  let fixture: ComponentFixture<AddReceiverComponent>;
  let activatedRoute = {
    params: {
      subscribe() {
        return of();
      }
    }
  };
  const fb = jasmine.createSpyObj('FormBuilder', ['group']);
  const formGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    country: new FormControl(''),
    mobileNumber: new FormControl(''),
    bankAccountNumber: new FormControl(''),
    iban: new FormControl(''),
    nickName: new FormControl('')
  });
  (<jasmine.Spy>(fb.group)).and.returnValue(formGroup);
  let router = {
    navigate: jasmine.createSpy('navigate')
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddReceiverComponent],
      imports: [
        ReceiversModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provider: FormBuilder, useValue: fb },
        { provider: FormGroup, useValue: formGroup },
        { provider: Router, useValue: router }
      ]
    });
    fixture = TestBed.createComponent(AddReceiverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Create Form', () => {
    it('should create initial add receiver form if formMode is add', () => {
      // Given
      const receiverForm = fb.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        country: ['', [Validators.required]],
        mobileNumber: ['', [Validators.maxLength(10), Validators.required]],
        bankAccountNumber: ['', [Validators.required]],
        iban: ['', [Validators.required]],
        nickName: ['', [Validators.required]]
      });
      const spyCheckModeOfForm = spyOn(component, 'checkModeOfForm');

      // When
      component.createReceiverForm();

      // Then
      expect(component.receiversForm.value).toEqual(receiverForm.value);
      expect(spyCheckModeOfForm).toHaveBeenCalled();
    });
  });

  describe('checkModeOfForm', () => {
    it('should check form mode and call getReceiverDetails if formMode is modify', () => {
      // Given
      component.formMode = 'modify';
      spyOn(component, 'getReceiverDetails');

      // When
      component.checkModeOfForm();

      // Then
      expect(component.getReceiverDetails).toHaveBeenCalled();
    });

    it('should check form mode and call getReceiverDetails if formMode is add', () => {
      // Given
      component.formMode = 'add';
      spyOn(component, 'getReceiverDetails');

      // When
      component.checkModeOfForm();

      // Then
      expect(component.getReceiverDetails).not.toHaveBeenCalled();
    });
  });

  describe('getReceiverDetails', () => {
    it('should GET receiver details by receiver id', () => {
      // Given
      let receiver = {
        status: 200,
        message: {
          code: "200",
          description: "Success"
        },
        errors: null,
        beneficiary: {
          firstName: "Test",
          lastName: "Test",
          country: "India",
          mobileNumber: "1234567890",
          bankAccountNumber: 1234567,
          iban: "IDFC004",
          nickName: "test123"
        }
      }
      spyOn(component['receiversApi'], 'getReceiver').and.returnValue(of(receiver));

      // When
      component.getReceiverDetails();

      // Then
      expect(component.receiversForm.value).toEqual(receiver.beneficiary);
    });
  });

  describe('addReceiverDetails', () => {
    it('should submit add receiver form if form is VALID', () => {
      // Given
      // const receiverForm = fb.group({
      //   firstName: ['Test'],
      //   lastName: ['Test'],
      //   country: ['India'],
      //   mobileNumber: ['1234567890'],
      //   bankAccountNumber: ['123412341234'],
      //   iban: ['ICIC0000'],
      //   nickName: ['test123']
      // });

      const receiverDetails = {
        status: 200,
        message: {
          code: "200",
          description: "User Beneficiary Added Successfully"
        },
        errors: null,
        beneficiary: {
          firstName: "Test",
          lastName: "Test",
          country: "India",
          bankAccountNumber: 1234567,
          iban: "IDFC004",
          nickName: "test"
        }
      }

      spyOn(component['receiversApi'], 'addReceiver').and.returnValue(of(receiverDetails));
      const openSnackBar = spyOn(component['snackBarService'], 'openSuccessSnackBar');
      const navigate = spyOn(component['router'], 'navigate');

      // When
      component.addReceiverDetails();

      // Then
      expect(openSnackBar).toHaveBeenCalledWith('Receiver added successfully', '');
      expect(navigate).toHaveBeenCalledWith(['/receivers']);
    });
  });

  describe('modifyReceiverDetails', () => {
    it('should modify receiver if form is VALID', () => {
      // Given
      const receiverDetails = {
        status: 200,
        message: {
          code: "200",
          description: "Receiver modified successfully"
        },
        errors: null,
        beneficiary: {
          firstName: "Test123",
          lastName: "Test123",
          country: "India",
          bankAccountNumber: 1234567,
          iban: "IDFC004",
          nickName: "test"
        }
      }

      spyOn(component['receiversApi'], 'modifyReceiver').and.returnValue(of(receiverDetails));
      const openSnackBar = spyOn(component['snackBarService'], 'openSuccessSnackBar');
      const navigate = spyOn(component['router'], 'navigate');

      // When
      component.modifyReceiverDetails();

      // Then
      expect(openSnackBar).toHaveBeenCalledWith('Receiver modified successfully', '');
      expect(navigate).toHaveBeenCalledWith(['/receivers']);
    });
  })

});
