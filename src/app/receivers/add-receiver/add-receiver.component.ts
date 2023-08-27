import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReceiversAPI } from '../receivers.api';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

@Component({
  selector: 'app-add-receiver',
  templateUrl: './add-receiver.component.html',
  styleUrls: ['./add-receiver.component.scss']
})
export class AddReceiverComponent implements OnInit {
  public receiversForm: any = FormGroup;
  public formMode: string = 'add';
  public receiverId!: string;
  public colspan: number = 2;
  public maxCols: number = 2;
  public rowHeight: string = '70px';

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private receiversApi: ReceiversAPI,
    private router: Router,
    private snackBarService: SnackBarService) {
    this.activatedRoute.params.subscribe(param => {
      this.receiverId = param['id'];
      if (this.receiverId) {
        this.formMode = 'modify';
      }
    })
  }

  ngOnInit() {
    this.createReceiverForm();
  }

  createReceiverForm() {
    this.receiversForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      country: ['', [Validators.required]],
      mobileNumber: ['', [Validators.pattern(/^[6-9]\d{9}$/)]],
      bankAccountNumber: ['', [Validators.required]],
      iban: ['', [Validators.required]],
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
      this.receiversForm.controls['nickName'].disable();
    }, error => {
      console.log(error);
      this.snackBarService.openErrorSnackBar(error.message?.description, '');
    });
  }

  addReceiverDetails() {
    this.receiversApi.addReceiver(this.receiversForm.value).subscribe(response => {
      this.snackBarService.openSuccessSnackBar('Receiver added successfully', '');
      this.router.navigate(['/receivers']);
    }, error => {
      console.log(error);
      this.snackBarService.openErrorSnackBar(error.message?.description, '');
    });
  }

  modifyReceiverDetails() {
    this.receiversForm.controls['nickName'].enable();
    this.receiversApi.modifyReceiver(this.receiversForm.value).subscribe(response => {
      this.snackBarService.openSuccessSnackBar('Receiver modified successfully', '');
      this.router.navigate(['/receivers']);
    }, error => {
      console.log(error);
      this.snackBarService.openErrorSnackBar(error.message?.description, '');
    });
  }

  onResize(event: any) {
    this.colspan = (event.target.innerWidth <= 660) ? 1 : 2;
    this.maxCols = (event.target.innerWidth <= 660) ? 1 : 2;
  }
}
