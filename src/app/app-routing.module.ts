import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormPaymentComponent } from 'src/app/form-payment/form-payment.component';

// Routing
const routes: Routes = [
  {
    path: 'payment-form',
    component: FormPaymentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
