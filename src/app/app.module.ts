import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './Commun/sidebar/sidebar.component';
import { PowerbiComponent } from './Admin/powerbi/powerbi.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './Auth/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RegisterComponent } from './Auth/register/register.component';
import {CodeInputModule} from "angular-code-input";
import {HttpTokenInterceptor} from "./services/Interceptor/http-token.interceptor";
import { DatasetComponent } from './Admin/dataset/dataset.component';
import { AdminRoutingModule } from './Admin/admin/admin-routing.module';
import { UserlistComponent } from './Admin/UserList/userlist/userlist.component';
import {ProfileComponent} from "./Client/profile/profile.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { PredictionComponent } from './Admin/prediction/prediction.component';
import { LoaderComponent } from './Commun/Loaders/loader/loader.component';
import { LoaderMoneyComponent } from './Commun/Loaders/loader-money/loader-money.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {NgApexchartsModule} from "ng-apexcharts"
import {HomeComponent} from "./Commun/home/home.component";
import { FilterBarComponent } from './Admin/filter-bar/filter-bar.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import { AdminsidebarComponent } from './Admin/adminsidebar/adminsidebar.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { NavbarComponent } from './Commun/navbar/navbar.component';
import { NotificationComponent } from './Admin/notification/notification.component';
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import { DescriptionDialogComponent } from './Commun/home/description-dialog/description-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import { NumberAbbreviatePipe } from './Commun/home/number-abbreviate.pipe';
import { DialogcleanComponent } from './Admin/dataset/dialogclean/dialogclean.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import { DecisionsComponent } from './Admin/decisions/decisions.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    PowerbiComponent,
    LoginComponent,
    RegisterComponent,
    DatasetComponent,
    UserlistComponent,
    ProfileComponent,
    PredictionComponent,
    LoaderComponent,
    LoaderMoneyComponent,
    HomeComponent,
    FilterBarComponent,
    AdminsidebarComponent,
    NavbarComponent,
    NotificationComponent,
    DescriptionDialogComponent,
    NumberAbbreviatePipe,
    DialogcleanComponent,
    DecisionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CodeInputModule,
    AdminRoutingModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    NgApexchartsModule,
    MatToolbarModule,
    FontAwesomeModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
   MatTooltipModule

  ],
  providers: [
    HttpClient,
    {
      provide: HTTP_INTERCEPTORS,
      useClass:HttpTokenInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent],


})
export class AppModule { }
