import { Component, OnInit } from '@angular/core';
import { CommunityStatisticsPageComponent as BaseComponent } from '../../../../../app/statistics-page/community-statistics-page/community-statistics-page.component';
import { ActivatedRoute, Router } from '@angular/router';
import { UsageReportDataService } from '../../../../../app/core/statistics/usage-report-data.service';
import { DSONameService } from '../../../../../app/core/breadcrumbs/dso-name.service';
import { AuthService } from '../../../../../app/core/auth/auth.service';

@Component({
  selector: 'ds-collection-statistics-page',
  styleUrls: ['./community-statistics-page.component.scss'],
  templateUrl: './community-statistics-page.component.html',
})

/**
 * Component representing the statistics page for a community.
 */
export class CommunityStatisticsPageComponent extends BaseComponent implements OnInit {
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

