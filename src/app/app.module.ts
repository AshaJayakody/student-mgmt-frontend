import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FileUploadComponent } from './file-upload/file-upload.component';

import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { HomeComponent } from './home/home.component';
import { UploadsModule } from '@progress/kendo-angular-upload';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { GridModule } from '@progress/kendo-angular-grid';
import { StudentsComponent } from './students/students.component';
import { IconsModule } from '@progress/kendo-angular-icons';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { GraphqlModule } from './core/graphql.module';
import { GraphqlService } from './core/services/graphql.service';

@NgModule({
  declarations: [
    AppComponent,
    FileUploadComponent,
    HomeComponent,
    StudentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ButtonsModule,
    UploadsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    GridModule,
    IconsModule,
    DateInputsModule,
    GraphqlModule
  ],
  providers:[],
  bootstrap: [AppComponent]
})
export class AppModule { }
