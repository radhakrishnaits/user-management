import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-receiver',
  templateUrl: './add-receiver.component.html',
  styleUrls: ['./add-receiver.component.scss']
})
export class AddReceiverComponent implements OnInit {
  public beneficiaryForm: any = FormGroup;
  constructor(private formBuilder: FormBuilder, private dialogRef: DialogRef) { }

  ngOnInit() {
    this.createReceiverForm();
  }

  createReceiverForm() {
    this.beneficiaryForm = this.formBuilder.group({
      benFirstName: [''],
      benLastName: [''],
      benCountry: [''],
      mobileNumber: [''],
      bankAccountNumber: [''],
      iban: ['']
    })
  }
}
