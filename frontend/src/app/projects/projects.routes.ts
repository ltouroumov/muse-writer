import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ProjectsComponent} from './projects.component';
import {ShowComponent} from './show/show.component';
import {FormComponent} from './form/form.component';

const routes: Routes = [{
  path: 'projects',
  component: ProjectsComponent,
  children: [
    {
      path: 'new',
      component: FormComponent,
    },
    {
      path: ':id',
      component: ShowComponent,
    },
    {
      path: ':id/edit',
      component: FormComponent,
    },
  ],
}];

export const projectRoutes: ModuleWithProviders = RouterModule.forChild(routes);
