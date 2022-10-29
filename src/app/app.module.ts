import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableModule } from './table/table.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgbModule, AppRoutingModule, TableModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
