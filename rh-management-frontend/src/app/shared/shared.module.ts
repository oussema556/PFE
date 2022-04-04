import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './components/profile/profile.component';
import { EditAccountComponent } from './components/edit-account/edit-account.component';
import { CreateReqFormComponent } from './components/create-req-form/create-req-form.component';
import { CreateDocFormComponent } from './components/create-doc-form/create-doc-form.component';
import { DocumentSpaceComponent } from './components/document-space/document-space.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatIconModule} from "@angular/material/icon";
import {MatBadgeModule} from "@angular/material/badge";
import {RouterModule} from "@angular/router";
import { DataTableComponent } from './components/data-table/data-table.component';
import {PaginationComponent} from "./components/pagination/pagination.component";
import {MaterialModule} from "./material/material.module";
import { ErrorMessageComponent } from './ui-lib/error-message/error-message.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { NoPerissionComponent } from './components/no-perission/no-perission.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RequestProfileComponent } from './components/request-profile/request-profile.component';
import { ButtonComponent } from './ui-lib/button/button.component';
import {FormsModule} from "@angular/forms";



@NgModule({
    declarations: [
        ProfileComponent,
        EditAccountComponent,
        CreateReqFormComponent,
        CreateDocFormComponent,
        DocumentSpaceComponent,
        SideNavComponent,
        DataTableComponent,
        PaginationComponent,
        ErrorMessageComponent,
        SearchBarComponent,
        NoPerissionComponent,
        PageNotFoundComponent,
        RequestProfileComponent,
        ButtonComponent
    ],
    exports: [
        ProfileComponent,
        EditAccountComponent,
        CreateReqFormComponent,
        CreateDocFormComponent,
        DocumentSpaceComponent,
        SideNavComponent,
        DataTableComponent,
        ErrorMessageComponent,
        SearchBarComponent,
        ButtonComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        FormsModule
    ]
})
export class SharedModule { }
