import { NgModule } from '@angular/core';
import { SharedModule } from '../../app/shared/shared.module';
import { StatisticsModule } from '../../app/statistics/statistics.module';
import { HomePageModule } from '../../app/home-page/home-page.module';
import { ItemPageModule } from '../../app/item-page/item-page.module';
import { StatisticsPageModule } from '../../app/statistics-page/statistics-page.module';
import { CommunityPageModule } from '../../app/community-page/community-page.module';
import { ComcolModule } from '../../app/shared/comcol/comcol.module';
import { HomePageComponent } from './app/home-page/home-page.component';
import { HomeNewsComponent } from './app/home-page/home-news/home-news.component';
import { SearchFormComponent } from './app/shared/search-form/search-form.component';
import { FullItemPageComponent } from './app/item-page/full/full-item-page.component';
import { CollectionPageComponent } from './app/collection-page/collection-page.component';
import { CommunityPageComponent } from './app/community-page/community-page.component';
import { ItemStatisticsPageComponent } from './app/statistics-page/item-statistics-page/item-statistics-page.component';
import { CollectionStatisticsPageComponent } from './app/statistics-page/collection-statistics-page/collection-statistics-page.component';
import { CommunityStatisticsPageComponent } from './app/statistics-page/community-statistics-page/community-statistics-page.component';
import { SiteStatisticsPageComponent } from './app/statistics-page/site-statistics-page/site-statistics-page.component';
import { ObjectListComponent } from './app/shared/object-list/object-list.component';
import { FileDownloadLinkComponent } from './app/shared/file-download-link/file-download-link.component';

import { ItemSharedModule } from '../../app/item-page/item-shared.module';
import { DsoPageModule } from '../../app/shared/dso-page/dso-page.module';
import { DatasetsPageModule } from 'src/app/datasets-page/datasets-page.module';

const DECLARATIONS = [
  HomePageComponent,
  HomeNewsComponent,
  SearchFormComponent,
  FullItemPageComponent,
  CollectionPageComponent,
  CommunityPageComponent,
  ItemStatisticsPageComponent,
  CollectionStatisticsPageComponent,
  CommunityStatisticsPageComponent,
  SiteStatisticsPageComponent,
  ObjectListComponent,
  FileDownloadLinkComponent,
];

@NgModule({
  imports: [
    ComcolModule,
    ItemSharedModule,
    HomePageModule,
    ItemPageModule,
    StatisticsPageModule,
    CommunityPageModule,
    DsoPageModule,
    SharedModule,
    StatisticsModule,
    DatasetsPageModule,
  ],
  declarations: DECLARATIONS,
})

  /**
   * This module serves as an index for all the components in this theme.
   * It should import all other modules, so the compiler knows where to find any components referenced
   * from a component in this theme
   * It is purposefully not exported, it should never be imported anywhere else, its only purpose is
   * to give lazily loaded components a context in which they can be compiled successfully
   */
class LazyThemeModule {
}
