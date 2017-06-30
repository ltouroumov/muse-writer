import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {EditorComponent} from './editor.component';

const routes: Routes = [{
  path: 'editor/:id',
  component: EditorComponent,
  children: [],
}];

export const editorRoutes: ModuleWithProviders = RouterModule.forChild(routes);
