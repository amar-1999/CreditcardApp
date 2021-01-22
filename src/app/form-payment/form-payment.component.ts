import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlatpickrOptions } from 'ng2-flatpickr';

import { FormPaymentService } from 'src/app/form-payment/form-payment.service';

@Component({
  selector: 'app-form-payment',
  templateUrl: './form-payment.component.html',
  styleUrls: ['./form-payment.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FormPaymentComponent implements OnInit {
  // Public
  public creditCardPaymentDetails: FormGroup;
  public submitted = false;

  public expirationDateOptions: FlatpickrOptions;

  private dateToday = new Date();
  private dateTomorrow = new Date(
    this.dateToday.getTime() + 1000 * 60 * 60 * 24
  );

  /**
   *
   * @param {FormBuilder} formBuilder
   * @param {FormPaymentService} _formPaymentService
   */
  constructor(
    private formBuilder: FormBuilder,
    private _formPaymentService: FormPaymentService
  ) {
    // Validating with ng2-flatpickr (select date greater than today)
    this.expirationDateOptions = {
      altInput: true,
      minDate: this.dateTomorrow,
    };
  }

  /**
   * Getter for easy access to form fields
   */
  get paymentForm() {
    return this.creditCardPaymentDetails.controls;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * GetCalls On ngSubmit
   * Passing Current Form Values
   *
   * @param creditcardForm
   */
  onSubmit(creditcardForm) {
    this.submitted = true;
    // stop here if form is invalid
    if (this.creditCardPaymentDetails.invalid) {
      return;
    }
    // updated Credit Card Details and Call POST request internally
    this._formPaymentService.setCreditCardDetails(creditcardForm.value);
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */

  ngOnInit(): void {
    this.creditCardPaymentDetails = this.formBuilder.group({
      creditCardNumber: ['', Validators.required],
      cardHolder: ['', Validators.required],
      expirationDate: ['', Validators.required],
      securityCode: ['', Validators.pattern('^[0-9]{3}$')],
      amount: ['', [Validators.required, Validators.pattern('^[1-9][0-9]*$')]],
    });
  }
}
