import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {DataViewModule} from 'primeng/dataview';
import {ButtonModule} from 'primeng/button';
import {PanelModule} from 'primeng/panel';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';

import { AppComponent } from './app.component';
import { StashItemService } from './services/stash-item.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DataViewModule,
    ButtonModule,
    PanelModule,
    DropdownModule,
    InputTextModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [StashItemService],
  bootstrap: [AppComponent],

})
export class AppModule { }
