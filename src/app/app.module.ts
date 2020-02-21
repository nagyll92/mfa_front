import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { LayoutComponent } from './layout/layout.component';
import { MaterialModule } from './material/material.module';
import { AccountsComponent } from './accounts/accountList/accounts.component';
import { CategoriesComponent } from './categories/categories.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AccountFormComponent } from './accounts/account-form/account-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmationDialogComponent } from './components/shared/confirmation-dialog/confirmation-dialog.component';

const appRoutes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'accounts', component: AccountsComponent },
  { path: 'accounts/new', component: AccountFormComponent },
  { path: 'accounts/:accountName', component: AccountFormComponent },
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
    ConfirmationDialogComponent
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
  bootstrap: [AppComponent]
})
export class AppModule {
}
