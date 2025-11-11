import {
  Component,
  Input,
  AfterViewInit,
  Renderer2,
  ElementRef,
  OnInit,
} from '@angular/core';
import { BrowseDefinitionDataService } from '../../../../../core/browse/browse-definition-data.service';
import { BrowseService } from '../../../../../core/browse/browse.service';

import { Item } from '../../../../../core/shared/item.model';
import { ItemPageFieldComponent } from '../item-page-field.component';

@Component({
  selector: 'ds-item-page-altmetric-field',
  templateUrl: './item-page-altmetric-field.component.html',
})
/**
 * This component renders an Altmetric badge.
 * It expects 2 parameters: The item and the popover placement
 */
export class ItemPageAltmetricFieldComponent extends ItemPageFieldComponent implements OnInit, AfterViewInit {
  constructor(
    private readonly renderer: Renderer2,
    private readonly elementRef: ElementRef,
    protected browseDefinitionDataService: BrowseDefinitionDataService,
    protected browseService: BrowseService,
  ) {
    super(browseDefinitionDataService, browseService);
  }

  /**
   * The item to display metadata for
   */
  @Input() item: Item;

  /**
   * Popover placement
   */
  @Input() badgePopover: string;

  ngOnInit() {
    const scriptTag = this.renderer.createElement(
      'script',
    ) as HTMLScriptElement;
    scriptTag.src = `https://embed.altmetric.com/assets/embed.js`;
    scriptTag.async = true;
    this.renderer.appendChild(this.elementRef.nativeElement, scriptTag);
  }

  ngAfterViewInit() {
    try {
      (window as any)._altmetric_embed_init();
    } catch {}
  }

  /**
   * Helper function to extract the DOI itself from a URI. Should return the
   * DOI component for any variation of http, https, dx.doi.org, and doi.org.
   * @type {string}
   */
  parseDoi(doi: string) {
    const regex = /https?:\/\/(dx\.)?doi\.org\//gi;
    return doi.replace(regex, '');
  }

  /**
   * Helper function to extract the Handle itself from a URI.
   * @type {string}
   */
  parseHandle(handle: string) {
    const regex = /https?:\/\/hdl\.handle\.net\//gi;
    return handle.replace(regex, '');
  }
}
