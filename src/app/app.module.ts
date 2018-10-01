import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatNativeDateModule
 } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatMenuModule } from '@angular/material/menu';

import { AppComponent } from './app.component';
import { TimesheetComponent } from './timesheet/timesheet.component';
import { TimesheetService } from './timesheet/timesheet.service';
import { AuthService } from './login-sign-up/auth.service';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { LoginSignUpComponent } from './login-sign-up/login-sign-up.component';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { TaskListComponent } from './task-list/task-list.component';


@NgModule({
  declarations: [
    AppComponent,
    TimesheetComponent,
    HeaderComponent,
    LoginSignUpComponent,
    TaskListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonToggleModule,
    AppRoutingModule,
    HttpClientModule,
    MatMenuModule,
    FormsModule
  ],
  providers: [
    MatDatepickerModule,
    TimesheetService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
