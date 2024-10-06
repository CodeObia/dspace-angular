import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatasetsPageComponent } from './datasets-page.component';
import { RouterLink } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    DatasetsPageComponent
  ],
    imports: [
        CommonModule,
        RouterLink,
        SharedModule
    ]
})
export class DatasetsPageModule { }

