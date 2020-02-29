import { NgModule } from '@angular/core';
import { BrowserModule, HammerModule  } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { LayoutComponent } from './components/layout/layout.component';
import { MaterialModule } from './material/material.module';
import { AccountsComponent } from './accounts/account-list/accounts.component';
import { CategoriesComponent } from './categories/category-list/categories.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AccountFormComponent } from './accounts/account-form/account-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmationDialogComponent } from './components/shared/confirmation-dialog/confirmation-dialog.component';
import { TransferComponent } from './accounts/transfer/transfer.component';
import { SideChildComponent } from './components/shared/side-child/side-child.component';
import { ExpandableListComponent } from './components/shared/expandable-list/expandable-list.component';
import { CategoryFormComponent } from './categories/category-form/category-form.component';
import { TransactionFormComponent } from './transactions/transaction-form/transaction-form.component';
import { httpInterceptorProviders } from './http-interceptors';

const appRoutes: Routes = [
  {
    path: 'dashboard', data: { title: 'Dashboard' }, component: DashboardComponent, children: [
      {
        path: 'transaction', children: [
          { path: 'income', component: TransactionFormComponent },
          { path: 'expense', component: TransactionFormComponent },
          { path: 'edit/:transactionId', component: TransactionFormComponent },
        ],
      },
    ],
  },
  {
    path: 'accounts', data: { title: 'Accounts' }, component: AccountsComponent, children: [
      { path: 'new', component: AccountFormComponent },
      { path: 'transfer', component: TransferComponent },
      { path: 'edit/:accountName', component: AccountFormComponent },
    ],
  },
  {
    path: 'categories', data: { title: 'Categories' }, component: CategoriesComponent, children: [
      { path: 'new', component: CategoryFormComponent },
      { path: 'edit/:categoryName', component: CategoryFormComponent },
    ],
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

];

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    AccountsComponent,
    CategoriesComponent,
    DashboardComponent,
    AccountFormComponent,
    ConfirmationDialogComponent,
    TransferComponent,
    SideChildComponent,
    ExpandableListComponent,
    CategoryFormComponent,
    TransactionFormComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    HammerModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }, // <-- debugging purposes only
    ),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ReactiveFormsModule,
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {
}
