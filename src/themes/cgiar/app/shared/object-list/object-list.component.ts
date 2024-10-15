import {Component, OnInit} from '@angular/core';
import { ObjectListComponent as BaseComponent} from '../../../../../app/shared/object-list/object-list.component';

/**
 * A component to display the "Browse By" section of a Community or Collection page
 * It expects the ID of the Community or Collection as input to be passed on as a scope
 */
@Component({
  selector: 'ds-object-list',
  styleUrls: ['./object-list.component.scss'],
  templateUrl: './object-list.component.html'
})

export class ObjectListComponent extends BaseComponent implements OnInit {

  isBrowseEntry = false;
  ngOnInit() {
    this.isBrowseEntry = (this.objects?.payload?.page?.[0] as any)?.type === 'browseEntry';
  }
}
