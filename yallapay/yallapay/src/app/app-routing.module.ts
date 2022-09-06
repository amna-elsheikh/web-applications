import { LoginGuard } from './login/login.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceFormComponent } from './invoice/invoice-form/invoice-form.component';
import { CustomersComponent } from './customer/customers/customers.component';
import { CustomersFormComponent } from './customer/customers-form/customers-form.component';
import { InvoiceListComponent } from './invoice/invoice-list/invoice-list.component';
import { PaymentListComponent } from './payment/payment-list/payment-list.component';
import { PaymentFormComponent } from './payment/payment-form/payment-form.component';
import { DepositsListComponent } from './deposits/deposits-list/deposits-list.component';
import { DepositsFormComponent } from './deposits/deposits-form/deposits-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ChequesComponent } from './cheques/cheques.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent   },
  {
    path: '',
    component: HomeComponent,canActivate:[LoginGuard],

    children: [
      { path: 'cheques', component: ChequesComponent },
      { path: 'dashboard', component: DashboardComponent },

      {
        path: 'customers',
        children: [
          { path: '', component: CustomersComponent,canActivate:[LoginGuard]  },
          {
            path: 'customer-form',
            children: [
              { path: '', component: CustomersFormComponent },
              { path: ':id', component: CustomersFormComponent },
            ],
          },
        ],
      },
      {
        path: 'invoices',
        children: [
          { path: '', component: InvoiceListComponent },

          {
            path: 'invoice-form',
            children: [
              { path: '', component: InvoiceFormComponent },

              { path: ':id', component: InvoiceFormComponent },
            ],
          },
        ],
      },
      {
        path: 'payments/invoice/:invoiceNo',
        children: [
          { path: '', component: PaymentListComponent },

          {
            path: 'payment-form',
            children: [
              { path: '', component: PaymentFormComponent },

              {
                path: ':id',
                component: PaymentFormComponent,
              },
            ],
          },
        ],
      },
      {
        path: 'deposits',
        children: [
          { path: '', component: DepositsListComponent },
          {
            path: 'deposits-form',
            children: [
              { path: '', component: DepositsFormComponent },

              { path: ':id', component: DepositsFormComponent },
            ],
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
