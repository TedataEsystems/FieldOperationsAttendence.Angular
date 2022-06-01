import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgbModule,NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { LayoutComponent } from './layouts/layout/layout.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { UserrepositoryService } from './shared/services/userrepository.service';
import { HttpClientModule } from '@angular/common/http';
import { UseroperationComponent } from './shared/Modals/useroperation/useroperation.component';
import { PermissionoperationComponent } from './shared/Modals/permissionoperation/permissionoperation.component';
import { TeamsComponent } from './pages/teams/teams.component';
import { TeamoperationComponent } from './shared/Modals/teamoperation/teamoperation.component';
import { ProfileComponent } from './pages/profile/profile.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatProgressBarModule, MatSnackBarModule, MatToolbarModule} from '@angular/material';
import { DlDateTimeDateModule, DlDateTimePickerModule } from 'angular-bootstrap-datetimepicker';
import { PermissionTypesComponent } from './pages/permission-types/permission-types.component';
import { PermissionTypeOperationComponent } from './shared/Modals/permission-type-operation/permission-type-operation.component';
import { LogsComponent } from './pages/logs/logs.component';
import { DateTimePickerModule } from "@syncfusion/ej2-angular-calendars";
import { SuperadminteamComponent } from './shared/Modals/superadminteam/superadminteam.component';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { ChangepasswordComponent } from './pages/changepassword/changepassword.component';
import { DeleteComponent } from './shared/Modals/delete/delete.component';







@NgModule({
  declarations: [
    AppComponent,
    LoginLayoutComponent,
    LayoutComponent,
    LoginComponent,
    HomeComponent,
    UseroperationComponent,
    PermissionoperationComponent,
    TeamsComponent,
    TeamoperationComponent,
    ProfileComponent,
    PermissionTypesComponent,
    PermissionTypeOperationComponent,
    LogsComponent,
    SuperadminteamComponent,
    ChangepasswordComponent,
    DeleteComponent

  ],
  entryComponents: [
    UseroperationComponent,
    PermissionoperationComponent,
    TeamoperationComponent,
    PermissionTypeOperationComponent,
    SuperadminteamComponent,
    DeleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DlDateTimeDateModule,
    DlDateTimePickerModule,
    DateTimePickerModule,
    RxReactiveFormsModule,
    MatIconModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatProgressBarModule
  ],
  providers: [UserrepositoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
