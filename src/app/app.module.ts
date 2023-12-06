import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { AppComponent } from './app.component';
import { StudentComponentComponent } from './student-component/student-component.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CollegeComponent } from './college-component/college.component';
import { ProgramComponentComponent } from './program-component/program-component.component';
import { DepartmentComponentComponent } from './department-component/department-component.component';

 
@NgModule({
  declarations: [
    AppComponent,
    StudentComponentComponent,
    CollegeComponent,
    ProgramComponentComponent,
    DepartmentComponentComponent
   // routingComponents
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
