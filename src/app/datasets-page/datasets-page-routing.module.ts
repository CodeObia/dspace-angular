import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DatasetsPageModule } from './datasets-page.module';
import { DatasetsPageComponent } from './datasets-page.component';


@NgModule({
  imports: [
    DatasetsPageModule,
    RouterModule.forChild([
        {
          path: '',
          data: {
            title: 'datasets.title',
          },
          children: [
            {
              path: '',
              component: DatasetsPageComponent,
            },
          ]
        },
    ])
  ]
})
export class DatasetsPageRoutingModule {
}

