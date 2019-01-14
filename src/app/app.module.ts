import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import {CommonModule, HashLocationStrategy, LocationStrategy} from "@angular/common";
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {TaskService} from "./service/task.service";
import {HttpUtilService} from "./service/http-util.service";
import {TaskComponent} from "./task/task.component";
import {routing} from "./app.routing";

import {ModalModule} from "ngx-bootstrap";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {LoadingModule} from 'ngx-loading';
import {SortableModule} from 'ngx-bootstrap/sortable';
import {AngularFontAwesomeModule} from 'angular-font-awesome';

@NgModule({
    declarations: [
        AppComponent,
        TaskComponent,
    ],
    imports: [
        BsDropdownModule.forRoot(),
        ModalModule.forRoot(),
        SortableModule.forRoot(),
        AngularFontAwesomeModule,
        LoadingModule,
        CommonModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        routing
    ],
    exports: [
        BsDropdownModule,
        ModalModule,
        SortableModule,
        AngularFontAwesomeModule
    ],
    providers: [
        {provide: LOCALE_ID, useValue: 'pt-BR'},
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        HttpUtilService,
        TaskService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
