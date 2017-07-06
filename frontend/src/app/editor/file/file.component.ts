import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'muse-editor-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss'],
})
export class FileComponent implements OnInit {

  content: string = '';

  constructor() {
    // Empty
  }

  ngOnInit(): void {
    // Empty
  }

}
