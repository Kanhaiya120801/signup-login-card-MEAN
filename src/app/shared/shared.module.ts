import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ShortensPipe } from './shortens.pipe';


@NgModule({
  declarations: [
    SharedComponent,
    NavbarComponent,
    ShortensPipe
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports:[
    NavbarComponent,
    ShortensPipe
  ]
})
export class SharedModule { }
