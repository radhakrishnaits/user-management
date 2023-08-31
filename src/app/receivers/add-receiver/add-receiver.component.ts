import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReceiversAPI } from '../receivers.api';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-receiver',
  templateUrl: './add-receiver.component.html',
  styleUrls: ['./add-receiver.component.scss']
})
export class AddReceiverComponent implements OnInit {
  public receiversForm: any = FormGroup;
  public formMode: string = 'add';
  public receiverId: string = '';
  public colspan: number = 2;
  public maxCols: number = 2;
  public rowHeight: string = '70px';
  public countries: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private receiversApi: ReceiversAPI,
    private router: Router,
    private snackBarService: SnackBarService,
    private http: HttpClient) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(param => {
      this.receiverId = param['id'];
      if (this.receiverId) {
        this.formMode = 'modify';
      }
    });
    this.createReceiverForm();
    this.getCountries();
  }

  createReceiverForm() {
    this.receiversForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z_ ]*$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z_ ]*$/)]],
      country: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.?[0-9]+)?$/), Validators.maxLength(10)]],
      bankAccountNumber: ['', [Validators.required, Validators.maxLength(16), Validators.pattern(/^[0-9]+(\.?[0-9]+)?$/)]],
      iban: ['', [Validators.required, Validators.pattern(/^[A-Z]{4}0[A-Z0-9]{6}$/)]],
      nickName: ['', Validators.required]
    })
    this.checkModeOfForm();
  }

  checkModeOfForm() {
    if (this.formMode === 'modify') {
      this.getReceiverDetails();
    }
  }

  getReceiverDetails() {
    this.receiversApi.getReceiver(this.receiverId).subscribe(response => {
      let receiverDetails = response['beneficiary'];
      this.receiversForm.patchValue(receiverDetails);
    }, error => {
      this.snackBarService.openErrorSnackBar('Error while fetching receiver details', '');
    });
  }

  getCountries() {
    this.receiversApi.getCountries().subscribe((res: any) => {
      this.countries = res;
    });
  }

  addReceiverDetails() {
    this.receiversApi.addReceiver(this.receiversForm.value).subscribe(response => {
      this.snackBarService.openSuccessSnackBar('Receiver added successfully', '');
      this.router.navigate(['/receivers']);
    }, error => {
      console.log(error);
      this.snackBarService.openErrorSnackBar('Error while adding receiver details', '');
    });
  }

  modifyReceiverDetails() {
    this.receiversForm.controls['nickName'].enable();
    this.receiversApi.modifyReceiver(this.receiversForm.value).subscribe(response => {
      this.snackBarService.openSuccessSnackBar('Receiver modified successfully', '');
      this.router.navigate(['/receivers']);
    }, error => {
      console.log(error);
      this.snackBarService.openErrorSnackBar('Error while modifying receiver details', '');
    });
  }

  onResize(event: any) {
    this.colspan = (event.target.innerWidth <= 660) ? 1 : 2;
    this.maxCols = (event.target.innerWidth <= 660) ? 1 : 2;
  }
}
