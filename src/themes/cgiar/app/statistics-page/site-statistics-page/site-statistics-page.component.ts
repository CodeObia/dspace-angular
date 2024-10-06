import { Component, OnInit} from '@angular/core';
import { SiteStatisticsPageComponent as BaseComponent } from '../../../../../app/statistics-page/site-statistics-page/site-statistics-page.component';
import { ActivatedRoute, Router } from '@angular/router';
import { UsageReportDataService } from '../../../../../app/core/statistics/usage-report-data.service';
import { DSONameService } from '../../../../../app/core/breadcrumbs/dso-name.service';
import { SiteDataService } from '../../../../../app/core/data/site-data.service';
import { AuthService } from '../../../../../app/core/auth/auth.service';

@Component({
  selector: 'ds-site-statistics-page',
  styleUrls: ['./site-statistics-page.component.scss'],
  templateUrl: './site-statistics-page.component.html',
})

/**
 * Component representing the site-wide statistics page.
 */
export class SiteStatisticsPageComponent extends BaseComponent implements OnInit {
  constructor(
    protected route: ActivatedRoute,
    protected router: Router,
    protected usageReportService: UsageReportDataService,
    protected nameService: DSONameService,
    protected siteService: SiteDataService,
    protected authService: AuthService,
  ) {
    super(route, router, usageReportService, nameService, siteService, authService);
  }
}

