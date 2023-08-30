import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddReceiverComponent } from './add-receiver.component';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReceiversModule } from '../receivers.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { ReceiversDetails } from 'src/app/mocks/receivers.mock';

describe('AddReceiverComponent', () => {
  let component: AddReceiverComponent;
  let fixture: ComponentFixture<AddReceiverComponent>;
  let activatedRoute = {
    params: {
      subscribe() {
        return of('test123');
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
        SnackBarService,
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
    it('should GET receiver details by nick name', () => {
      // Given
      spyOn(component['receiversApi'], 'getReceiver').and.returnValue(of(ReceiversDetails.getReceiverDetails));

      // When
      component.getReceiverDetails();

      // Then
      expect(component.receiversForm.value).toEqual(ReceiversDetails.getReceiverDetails.beneficiary);
    });

    it('Error while getting receiver details', () => {
      // Given
      spyOn(component['receiversApi'], 'getReceiver').and.returnValue(throwError(() => new Error()));
      const openSnackBar = spyOn(component['snackBarService'], 'openErrorSnackBar');

      // When
      component.getReceiverDetails();

      // Then
      expect(openSnackBar).toHaveBeenCalledWith('Error while fetching receiver details', '');
    });
  });

  describe('addReceiverDetails', () => {
    it('should submit add receiver form if form is VALID', () => {
      // Given
      const receiverForm = fb.group({
        firstName: ['Test'],
        lastName: ['Test'],
        country: ['India'],
        mobileNumber: ['1234567890'],
        bankAccountNumber: ['1234567'],
        iban: ['IDFC004'],
        nickName: ['test']
      });

      spyOn(component['receiversApi'], 'addReceiver').and.returnValue(of(ReceiversDetails.addReceiverDetails));
      const openSnackBar = spyOn(component['snackBarService'], 'openSuccessSnackBar');
      const navigate = spyOn(component['router'], 'navigate');

      // When
      component.addReceiverDetails();

      // Then
      expect(receiverForm.valid).toBeTruthy();
      expect(openSnackBar).toHaveBeenCalledWith('Receiver added successfully', '');
      expect(navigate).toHaveBeenCalledWith(['/receivers']);
    });

    it('Error while adding receiver details', () => {
      // Given
      spyOn(component['receiversApi'], 'addReceiver').and.returnValue(throwError(() => new Error()));
      const openSnackBar = spyOn(component['snackBarService'], 'openErrorSnackBar');

      // When
      component.addReceiverDetails();

      // Then
      expect(openSnackBar).toHaveBeenCalledWith('Error while adding receiver details', '');
    });
  });

  describe('modifyReceiverDetails', () => {
    it('should modify receiver if form is VALID', () => {
      // Given
      const receiverForm = fb.group({
        firstName: ['Test123'],
        lastName: ['Test123'],
        country: ['India'],
        mobileNumber: ['1234567890'],
        bankAccountNumber: ['1234567'],
        iban: ['IDFC004'],
        nickName: ['test123']
      });

      spyOn(component['receiversApi'], 'modifyReceiver').and.returnValue(of(ReceiversDetails.modifyReceiverDetails));
      const openSnackBar = spyOn(component['snackBarService'], 'openSuccessSnackBar');
      const navigate = spyOn(component['router'], 'navigate');

      // When
      component.modifyReceiverDetails();

      // Then
      expect(receiverForm.valid).toBeTruthy();
      expect(openSnackBar).toHaveBeenCalledWith('Receiver modified successfully', '');
      expect(navigate).toHaveBeenCalledWith(['/receivers']);
    });

    it('Error while modifying receiver details', () => {
      // Given
      spyOn(component['receiversApi'], 'modifyReceiver').and.returnValue(throwError(() => new Error()));
      const openSnackBar = spyOn(component['snackBarService'], 'openErrorSnackBar');

      // When
      component.modifyReceiverDetails();

      // Then
      expect(openSnackBar).toHaveBeenCalledWith('Error while modifying receiver details', '');
    });
  });

  describe('onResize()', () => {
    it('should call onResize if width greater than or equal to 660', () => {
      // Given
      const event = {
        target: {
          innerWidth: window.innerWidth
        }
      }

      // When
      component.onResize(event);

      // Then
      expect(component.colspan).toEqual(2);
      expect(component.maxCols).toEqual(2);
    });
  });

});
