import { Component, Input, OnInit } from '@angular/core';

import { ItemPageFieldComponent } from '../item-page-field.component';
import { Item } from '../../../../../core/shared/item.model';

@Component({
  selector: 'ds-item-page-social-share',
  styleUrls: ['./item-page-social-share.component.scss'],
  templateUrl: './item-page-social-share.component.html'
})
/**
 * This component renders social share kit
 * It expects 2 parameters: The item, social media icons
 */

export class ItemPageSocialShareComponent extends ItemPageFieldComponent implements OnInit {

  /**
   * The item to display metadata for
   */
  @Input() item: Item;

  /**
   * Social media icons to render
   */
  @Input() socialIcons = {}

  /**
   * Default settings for social media icons
   */
  defaults = {
    twitter: {
      shareLink: 'https://twitter.com/intent/tweet?url={{SHARE_URL}}&text={{SHARE_TEXT}}',
      link: 'https://twitter.com/{{IDENTIFIER}}',
      iconClass: 'fa-brands fa-twitter',
      tooltip: 'Twitter',
    },
    whatsapp: {
      shareLink: 'whatsapp://send?text={{SHARE_URL}} {{SHARE_TEXT}}',
      link: null,
      iconClass: 'fa-brands fa-whatsapp',
      tooltip: 'WhatsApp',
    },
    linkedin: {
      shareLink: 'https://www.linkedin.com/shareArticle?mini=true&url={{SHARE_URL}}',
      link: 'https://www.linkedin.com/{{IDENTIFIER}}',
      iconClass: 'fa-brands fa-linkedin-in',
      tooltip: 'LinkedIn',
    },
    facebook: {
      shareLink: 'https://www.facebook.com/sharer/sharer.php?u={{SHARE_URL}}',
      link: 'https://www.facebook.com/{{IDENTIFIER}}',
      iconClass: 'fa-brands fa-facebook-f',
      tooltip: 'Facebook',
    },
    youtube: {
      shareLink: null,
      link: 'https://www.youtube.com/{{IDENTIFIER}}',
      iconClass: 'fa-brands fa-youtube',
      tooltip: 'YouTube',
    },
    flickr: {
      shareLink: null,
      link: 'http://flickr.com/{{IDENTIFIER}}',
      iconClass: 'fa-brands fa-fflickr',
      tooltip: 'Flickr',
    },
    email: {
      shareLink: 'mailto:?&body={{SHARE_URL}}&subject={{SHARE_TEXT}}',
      link: null,
      iconClass: 'fa-solid fa-at',
      tooltip: 'Email',
    },
    link: {
      shareLink: '{{SHARE_URL}}',
      link: null,
      iconClass: 'fa-solid fa-link',
      tooltip: 'Copy link',
    },
  };

  icons = [];

  async ngOnInit() {
    for (const socialMedia in this.socialIcons) {
      if (this.socialIcons.hasOwnProperty(socialMedia)) {
        if (this.defaults?.[socialMedia]) {
          let valid = false;
          let link = '';
          if (this.socialIcons[socialMedia]?.linkIdentifier) {
            valid = this.defaults[socialMedia].link != null;

            link = this.defaults[socialMedia].link
                .replace('{{IDENTIFIER}}', this.socialIcons[socialMedia]?.linkIdentifier);
          } else {
            valid = this.defaults[socialMedia].shareLink != null;

            link = socialMedia === 'link' ? this.item.firstMetadataValue(this.socialIcons[socialMedia].urlField) : this.defaults[socialMedia].shareLink
                .replace('{{SHARE_URL}}', encodeURIComponent(this.item.firstMetadataValue(this.socialIcons[socialMedia].urlField)))
                .replace('{{SHARE_TEXT}}', encodeURIComponent(this.item.firstMetadataValue(this.socialIcons[socialMedia].textField)));
          }

          if (valid) {
            this.icons.push({
              type: socialMedia,
              iconClass: this.socialIcons[socialMedia].iconClass ? this.socialIcons[socialMedia].iconClass : this.defaults[socialMedia].iconClass,
              tooltip: this.socialIcons[socialMedia].tooltip ? this.socialIcons[socialMedia].tooltip : this.defaults[socialMedia].tooltip,
              link: link,
            });
          }
        }
      }
    }
  }
}

