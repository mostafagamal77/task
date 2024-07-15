import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TableDataComponent } from './components/table-data/table-data.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { NameFilterPipe } from './pipes/name-filter.pipe';
import { AmountFilterPipe } from './pipes/amount-filter.pipe';
import { FormsModule } from '@angular/forms';
import { NgApexchartsModule } from "ng-apexcharts";
import { DateFilterPipe } from './pipes/date-filter.pipe';



@NgModule({
  declarations: [
    AppComponent,
    TableDataComponent,
    NavbarComponent,
    FooterComponent,
    NameFilterPipe,
    AmountFilterPipe,
    DateFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    NgApexchartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
