import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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

const appRoutes: Routes = [
  { path: '', component: DashboardComponent },
  {
    path: 'accounts', component: AccountsComponent,  children: [
      { path: 'new', component: AccountFormComponent },
      { path: 'transfer', component: TransferComponent },
      { path: 'account/:accountName', component: AccountFormComponent},
    ],
  },
  /*{ path: 'accounts/new', component: AccountsComponent },
  { path: 'accounts/:accountName', component: AccountsComponent },*/
  { path: 'categories', component: CategoriesComponent },
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
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }, // <-- debugging purposes only
    ),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
