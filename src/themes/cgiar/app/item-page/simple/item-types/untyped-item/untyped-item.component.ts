import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Item } from '../../../../../../../app/core/shared/item.model';
import { ViewMode } from '../../../../../../../app/core/shared/view-mode.model';
import {
  listableObjectComponent
} from '../../../../../../../app/shared/object-collection/shared/listable-object/listable-object.decorator';
import { Context } from '../../../../../../../app/core/shared/context.model';
import {
  UntypedItemComponent as BaseComponent
} from '../../../../../../../app/item-page/simple/item-types/untyped-item/untyped-item.component';
import { RouteService } from '../../../../../../../app/core/services/route.service';
import { Router } from '@angular/router';

/**
 * Component that represents an untyped Item page
 */
@listableObjectComponent(Item, ViewMode.StandalonePage, Context.Any, 'cgiar')
@Component({
  selector: 'ds-untyped-item',
  styleUrls: ['./untyped-item.component.scss'],
  templateUrl: './untyped-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UntypedItemComponent extends BaseComponent {
  @Input() object: Item;

  constructor(
    protected routeService: RouteService,
    protected router: Router,
  ) {
    super(routeService, router);
  }

  socialIcons = {
    twitter: {
      iconClass: 'fa-brands fa-twitter x-large',
      tooltip: 'Twitter',
      urlField: 'dc.identifier.uri',
      textField: 'dc.title',
    },
    whatsapp: {
      iconClass: 'fa-brands fa-whatsapp x-large',
      tooltip: 'WhatsApp',
      urlField: 'dc.identifier.uri',
      textField: 'dc.title',
    },
    linkedin: {
      iconClass: 'fa-brands fa-linkedin-in x-large',
      tooltip: 'LinkedIn',
      urlField: 'dc.identifier.uri',
      textField: 'dc.title',
    },
    facebook: {
      iconClass: 'fa-brands fa-facebook-f x-large',
      tooltip: 'Facebook',
      urlField: 'dc.identifier.uri',
      textField: 'dc.title',
    },
    email: {
      iconClass: 'fa-solid fa-at x-large',
      tooltip: 'Email',
      urlField: 'dc.identifier.uri',
      textField: 'dc.title',
    },
    link: {
      iconClass: 'fa-solid fa-link x-large',
      tooltip: 'Copy link',
      urlField: 'dc.identifier.uri',
      textField: 'dc.title',
    },
  };
}
