import {Component, Input, OnInit} from '@angular/core';
import {ProjectDocument} from "../document-view/document-view.component";

@Component({
  selector: 'muse-editor-document-view-node',
  templateUrl: './document-view-node.component.html',
  styleUrls: ['./document-view-node.component.scss'],
})
export class DocumentViewNodeComponent implements OnInit {

  @Input() node: ProjectDocument;

  constructor() {
  }

  ngOnInit() {
  }

}
