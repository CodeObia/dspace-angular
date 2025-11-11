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
  selector: 'ds-item-page-dimensions-field',
  templateUrl: './item-page-dimensions-field.component.html'
})
/**
 * This component renders a Dimensions badge.
 * It expects 2 parameters: The item and the legend settings
 */
export class ItemPageDimensionsFieldComponent extends ItemPageFieldComponent implements OnInit, AfterViewInit {
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
   * Legend settings
   */
  @Input() legend: string;

  ngOnInit() {
    const scriptTag = this.renderer.createElement(
      'script',
    ) as HTMLScriptElement;
    scriptTag.src = `https://badge.dimensions.ai/badge.js`;
    scriptTag.async = true;
    this.renderer.appendChild(this.elementRef.nativeElement, scriptTag);
  }

  ngAfterViewInit() {
    try {
      (window as any).__dimensions_embed.addBadges();
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
}
