import {Component, Input, OnInit} from '@angular/core';

export class ProjectDocument {
  id: number;
  title: string;
  children: ProjectDocument[] = [];
}

@Component({
  selector: 'muse-editor-document-view',
  templateUrl: './document-view.component.html',
  styleUrls: ['./document-view.component.scss'],
})
export class DocumentViewComponent implements OnInit {

  @Input() documents: ProjectDocument[] = [];

  constructor() {
  }

  openDocument(id: number): void {
    console.log('opening', id);
  }

  ngOnInit(): void {
    console.log(this.documents);
  }

}
