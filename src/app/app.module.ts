import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormPaymentComponent } from './form-payment/form-payment.component';
import { FormPaymentService } from 'src/app/form-payment/form-payment.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { FakeDbService } from 'src/app/fake-db/fake-db.service';
import { ToastrModule } from 'ngx-toastr';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
@NgModule({
  declarations: [AppComponent, FormPaymentComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    InMemoryWebApiModule.forRoot(FakeDbService, {
      delay: 0,
      passThruUnknownUrl: true,
    }),
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    Ng2FlatpickrModule,
  ],
  providers: [FormPaymentService],
  bootstrap: [AppComponent],
})
export class AppModule {}