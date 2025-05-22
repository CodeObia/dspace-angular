import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DatasetsPageComponent } from './datasets-page.component';


@NgModule({
  imports: [
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

