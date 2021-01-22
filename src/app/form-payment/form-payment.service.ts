import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { ToastrService } from 'ngx-toastr';

import { CreditCardPayment } from 'src/app/form-payment/models/credit-card-payment.model';

@Injectable({
  providedIn: 'root',
})
export class FormPaymentService {
  // Public
  public onCreditCardDetailsChanged: BehaviorSubject<{}>;

  // Private
  private creditCardDetails: CreditCardPayment;

  /**
   *
   * @param {HttpClient} _httpClient
   * @param {ToastrService} toastr
   */
  constructor(private _httpClient: HttpClient, private toastr: ToastrService) {
    this.onCreditCardDetailsChanged = new BehaviorSubject({});
  }

  /**
   * Update Credit Card Payment with POST request
   * to local InMemoryWebApi for demo Purpose
   *
   * NOTE: In this POST request fakeDB will automatically assign a ID to new Object
   * Refer : https://stackoverflow.com/questions/50861850/id-should-be-optional-in-angular-in-memory-web-api
   *
   * HttpClient Requests Unsubscribes automatically.
   *
   * @param data
   * @returns {Promise<any>}
   */
  updateCreditCardPayment(): any {
    return new Promise((resolve, reject) => {
      this._httpClient
        .post<CreditCardPayment>(
          'api/credit-card-details',
          this.creditCardDetails
        )
        .subscribe(
          (response: any) => {
            console.log('Updated details are : ', response); // Log the POST data
            resolve();
          },
          reject, //If rejected do nothing
          () => {
            this.toastrSuccess(); // Get Notification Toast on Successful Completion
            console.log('Completed Successfully'); // Completed log
          }
        );
    });
  }

  /**
   * Success Notification Toast
   */

  toastrSuccess() {
    this.toastr.success('Card details updated successfully! ', 'Success 🎉');
  }

  /**
   * Set/Update Credit Card Details in Service
   *
   * @param CCardDetails
   */
  setCreditCardDetails(CCardDetails) {
    this.creditCardDetails = CCardDetails;
    this.onCreditCardDetailsChanged.next(this.creditCardDetails);
    // POST request after data is updated
    this.updateCreditCardPayment();
  }
}
