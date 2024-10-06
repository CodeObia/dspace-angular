import { Component, OnInit } from '@angular/core';
import { ItemStatisticsPageComponent as BaseComponent } from '../../../../../app/statistics-page/item-statistics-page/item-statistics-page.component';
import { ActivatedRoute, Router } from '@angular/router';
import { UsageReportDataService } from '../../../../../app/core/statistics/usage-report-data.service';
import { DSONameService } from '../../../../../app/core/breadcrumbs/dso-name.service';
import { AuthService } from '../../../../../app/core/auth/auth.service';

@Component({
  selector: 'ds-item-statistics-page',
  styleUrls: ['./item-statistics-page.component.scss'],
  templateUrl: './item-statistics-page.component.html',
})

/**
 * Component representing the statistics page for an item.
 */
export class ItemStatisticsPageComponent extends BaseComponent implements OnInit {
  constructor(
    protected route: ActivatedRoute,
    protected router: Router,
    protected usageReportService: UsageReportDataService,
    protected nameService: DSONameService,
    protected authService: AuthService,
  ) {
    super(route, router, usageReportService, nameService, authService);
  }

  async ngOnInit() {
    this.scope$ = this.getScope$();
  }
}

