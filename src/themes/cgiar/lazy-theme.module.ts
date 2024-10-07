import { NgModule } from '@angular/core';
import { SharedModule } from '../../app/shared/shared.module';
import { StatisticsModule } from '../../app/statistics/statistics.module';
import { HomePageModule } from '../../app/home-page/home-page.module';
import { ItemPageModule } from '../../app/item-page/item-page.module';
import { HomePageComponent } from './app/home-page/home-page.component';
import { HomeNewsComponent } from './app/home-page/home-news/home-news.component';
import { SearchFormComponent } from './app/shared/search-form/search-form.component';
import { FullItemPageComponent } from './app/item-page/full/full-item-page.component';
import { ItemStatisticsPageComponent } from './app/statistics-page/item-statistics-page/item-statistics-page.component';

import { ItemSharedModule } from '../../app/item-page/item-shared.module';
import { DsoPageModule } from '../../app/shared/dso-page/dso-page.module';

const DECLARATIONS = [
  HomePageComponent,
  HomeNewsComponent,
  SearchFormComponent,
  FullItemPageComponent,
  ItemStatisticsPageComponent,
];

@NgModule({
  imports: [
    ItemSharedModule,
    ItemPageModule,
    HomePageModule,
    DsoPageModule,
    SharedModule,
    StatisticsModule,
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
