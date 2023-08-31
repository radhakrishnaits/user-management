import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login/login.component';
import { MaterialModule } from './shared/material.module';
import { RegistrationComponent } from './registration/registration.component';
import { HttpClientModule } from '@angular/common/http';
import { AsyncPipe } from '@angular/common';
import { ProfileComponent } from './user/profile/profile.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ReceiversModule } from './receivers/receivers.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    AsyncPipe,
    ReactiveFormsModule,
    ReceiversModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
