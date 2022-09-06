import { CustomersService } from './service/customers.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomersComponent } from './customer/customers/customers.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { CustomersFormComponent } from './customer/customers-form/customers-form.component';
import { InvoiceFormComponent } from './invoice/invoice-form/invoice-form.component';
import { InvoiceListComponent } from './invoice/invoice-list/invoice-list.component';
import { PaymentFormComponent } from './payment/payment-form/payment-form.component';
import { PaymentListComponent } from './payment/payment-list/payment-list.component';
import { DepositsListComponent } from './deposits/deposits-list/deposits-list.component';
import { DepositsFormComponent } from './deposits/deposits-form/deposits-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ChequesComponent } from './cheques/cheques.component';
import { status } from './pipes/status.pipe';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [

    AppComponent,
    status,
    CustomersComponent,
    CustomersFormComponent,
    InvoiceFormComponent,
    InvoiceListComponent,
    PaymentListComponent,
    PaymentFormComponent,
    DepositsListComponent,
    DepositsFormComponent,
    ChequesComponent,
    DashboardComponent,
    LoginComponent,
    HomeComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule

  ],
  providers: [CustomersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
