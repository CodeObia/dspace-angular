import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomBrowsePageModule } from './custom-browse-page.module';
import { CustomBrowsePageComponent } from './custom-browse-page.component';
import { I18nBreadcrumbResolver } from '../core/breadcrumbs/i18n-breadcrumb.resolver';
import { CdkTreeModule } from '@angular/cdk/tree';


@NgModule({
  imports: [
    CustomBrowsePageModule,
    RouterModule.forChild([
      {
        path: '',
        component: CustomBrowsePageComponent,
        pathMatch: 'full',
        resolve: {
          breadcrumb: I18nBreadcrumbResolver
        },
        data: { title: 'menu.section.browse_global_by_researchProgram', breadcrumbKey: 'browse.metadata.researchProgram' }
      }
    ]),
    CdkTreeModule,
  ],
})
export class CustomBrowsePageRoutingModule {
}

