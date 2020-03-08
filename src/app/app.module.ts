import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AgGridModule } from 'ag-grid-angular';

import { AppComponent } from './app.component';
import { ContentComponent } from './content/content.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ConfigEditComponent } from './shared/config-edit/config-edit.component';
import { AppRoutingModule } from './app-routings.module';
import { ErrorComponent } from './error/error.component';

import { Routes, RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    HeaderComponent,
    FooterComponent,
    ConfigEditComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FontAwesomeModule,
    AgGridModule.withComponents([]),
    AppRoutingModule,
    RouterModule.forRoot([])
  ],
  entryComponents: [ConfigEditComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }