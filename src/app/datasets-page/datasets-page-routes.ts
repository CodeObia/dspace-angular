import {
  Route,
  Routes,
} from '@angular/router';

import { i18nBreadcrumbResolver } from '../core/breadcrumbs/i18n-breadcrumb.resolver';
import { hasValue } from '../shared/empty.util';
import {DatasetsPageComponent} from "./datasets-page.component";


export const ROUTES: Routes = [
  {
    path: '',
    component: DatasetsPageComponent,
    resolve: { breadcrumb: i18nBreadcrumbResolver },
    data: { title: 'datasets.title', breadcrumbKey: 'datasets.title' },
  },
].filter((route: Route) => hasValue(route));
