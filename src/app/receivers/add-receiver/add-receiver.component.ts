import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { ReceiversAPI } from '../receivers.api';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-receiver',
  templateUrl: './add-receiver.component.html',
  styleUrls: ['./add-receiver.component.scss']
})
export class AddReceiverComponent implements OnInit {
  public receiversForm: any = FormGroup;
  public formMode: string = 'add';
  public receiverId!: string;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private receiversApi: ReceiversAPI,
    private router: Router,
    private snackBar: MatSnackBar) {
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
    }, error => {
      console.log(error);
    });
  }

  addReceiverDetails() {
    this.receiversApi.addReceiver(this.receiversForm.value).subscribe(response => {
      this.snackBar.open('Receiver added successfully');
      this.router.navigate(['/receivers']);
    }, error => {
      console.log(error);
    });
  }

  modifyReceiverDetails() {
    this.receiversApi.modifyReceiver(this.receiversForm.value).subscribe(response => {
      this.snackBar.open('Receiver modified successfully');
      this.router.navigate(['/receivers']);
    }, error => {
      console.log(error);
    })
  }
}
