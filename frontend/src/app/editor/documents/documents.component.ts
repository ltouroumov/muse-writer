import {Component, Input, OnInit} from '@angular/core';
import {ProjectDocument} from '../project-document';

@Component({
  selector: 'muse-editor-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss'],
})
export class DocumentsComponent implements OnInit {

  @Input() documents: ProjectDocument;

  constructor() {
    // Nothing
  }

  ngOnInit(): void {
    // Nothing
  }

}
