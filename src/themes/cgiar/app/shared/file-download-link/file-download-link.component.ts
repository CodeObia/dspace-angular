import { Component, OnInit } from '@angular/core';
import {
  FileDownloadLinkComponent as BaseComponent
} from '../../../../../app/shared/file-download-link/file-download-link.component';

@Component({
  selector: 'ds-file-download-link',
  templateUrl: './file-download-link.component.html',
  styleUrls: ['../../../../../app/shared/file-download-link/file-download-link.component.scss'],
})
export class FileDownloadLinkComponent extends BaseComponent implements OnInit {
  fileExtension = '';

  ngOnInit() {
    super.ngOnInit();

    this.fileExtension = this.bitstream.firstMetadataValue('dc.title').split('.').reverse()[0].toUpperCase();
  }
}
