import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';

import {EditorComponent} from './editor.component';
import {editorRoutes} from './editor.routes';
import { DocumentViewComponent } from './document-view/document-view.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    editorRoutes,
  ],
  declarations: [EditorComponent, DocumentViewComponent],
})
export class EditorModule {
}
