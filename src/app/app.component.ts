import { Component, ViewEncapsulation } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FormPaymentService } from 'src/app/form-payment/form-payment.service';
import { CreditCardPayment } from 'src/app/form-payment/models/credit-card-payment.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  // Public
  public creditCardDetail: CreditCardPayment;

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   *
   * @param {FormPaymentService} _formPaymentService
   */
  constructor(private _formPaymentService: FormPaymentService) {
    this._unsubscribeAll = new Subject();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */

  ngOnInit(): void {
    this._formPaymentService.onCreditCardDetailsChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((response: CreditCardPayment) => {
        this.creditCardDetail = response;
      });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
