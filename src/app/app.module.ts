import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TableDataComponent } from './components/table-data/table-data.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NameFilterPipe } from './pipes/name-filter.pipe';
import { AmountFilterPipe } from './pipes/amount-filter.pipe';
import { FormsModule } from '@angular/forms';
import { NgApexchartsModule } from "ng-apexcharts";
import { DateFilterPipe } from './pipes/date-filter.pipe';
import { ScrollBtnComponent } from './components/scroll-btn/scroll-btn.component';
import { CustomChartComponent } from './components/chart/chart.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LoaderInterceptor } from './interceptors/loader.interceptor';



@NgModule({
  declarations: [
    AppComponent,
    TableDataComponent,
    NavbarComponent,
    FooterComponent,
    NameFilterPipe,
    AmountFilterPipe,
    DateFilterPipe,
    ScrollBtnComponent,
    CustomChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    NgApexchartsModule,
    NgxSpinnerModule.forRoot({ type: 'square-jelly-box' }),
    BrowserAnimationsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
