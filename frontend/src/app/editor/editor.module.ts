import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {TreeModule} from 'angular-tree-component';
import {MediumEditorComponent} from './medium-editor/medium-editor.component';

import {EditorComponent} from './editor.component';
import {editorRoutes} from './editor.routes';
import {DocumentsComponent} from './documents/documents.component';
import {FileComponent} from './file/file.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TreeModule,
    editorRoutes,
  ],
  declarations: [
    MediumEditorComponent,
    EditorComponent,
    DocumentsComponent,
    FileComponent,
  ],
})
export class EditorModule {
}
