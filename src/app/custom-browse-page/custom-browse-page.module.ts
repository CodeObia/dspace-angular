import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomBrowsePageComponent } from './custom-browse-page.component';
import { RouterLink } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CustomBrowsePageComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    SharedModule,
  ]
})
export class CustomBrowsePageModule { }

