import { Component } from '@angular/core';
import { FooterComponent as BaseComponent } from '../../../../app/footer/footer.component';

@Component({
  selector: 'ds-footer',
  styleUrls: ['./footer.component.scss'],
  templateUrl: './footer.component.html'
})
export class FooterComponent extends BaseComponent {
  socialIcons = {
    facebook: {
      iconClass: 'fa-brands fa-facebook-f',
      tooltip: 'Facebook',
      linkIdentifier: 'worldfishcenter',
    },
    twitter: {
      iconClass: 'fa-brands fa-twitter',
      tooltip: 'Twitter',
      linkIdentifier: 'worldfishcenter',
    },
    linkedin: {
      iconClass: 'fa-brands fa-linkedin-in',
      tooltip: 'LinkedIn',
      linkIdentifier: 'company/worldfish',
    },
    youtube: {
      iconClass: 'fa-brands fa-youtube',
      tooltip: 'YouTube',
      linkIdentifier: 'c/TheWorldFishCenter',
    },
    flickr: {
      iconClass: 'fa-brands fa-flickr',
      tooltip: 'Flickr',
      linkIdentifier: 'photos/theworldfishcenter',
    },
  };
}
