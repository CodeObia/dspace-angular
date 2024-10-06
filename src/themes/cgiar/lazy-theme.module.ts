import { NgModule } from '@angular/core';
import { SharedModule } from '../../app/shared/shared.module';
import { SearchFormComponent } from './app/shared/search-form/search-form.component';
import { ItemStatisticsPageComponent } from './app/statistics-page/item-statistics-page/item-statistics-page.component';

const DECLARATIONS = [
  SearchFormComponent,
  ItemStatisticsPageComponent,
];

@NgModule({
  imports: [
    SharedModule,
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
