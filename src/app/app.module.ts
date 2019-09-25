// Module
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material';
import { PredictModule } from "./predict/predict.module";
import { AuthInterceptor } from "./auth/auth-interceptor";
import { AppRoutingModule } from './app-routing.module';
// Component
import { AppComponent } from './app.component';
import { SignupComponent} from "./auth/signup/signup.component";
import { LoginComponent} from "./auth/login/login.component";
// Service
import { MessageService } from "./app.service";

import { DialogComponent } from "./dialog/dialog.component"

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    DialogComponent,

    // DialogDataExample,
    // DialogDataExampleDialog
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    PredictModule
  ],
  entryComponents: [DialogComponent],
  providers: [
    MessageService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
