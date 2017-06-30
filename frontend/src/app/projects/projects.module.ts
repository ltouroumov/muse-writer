import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {ProjectsComponent} from './projects.component';
import {projectRoutes} from './projects.routes';
import {FormComponent} from './form/form.component';
import {ShowComponent} from './show/show.component';
import {PROJECTS_API, PROJECTS_PROVIDER} from './services/projects.service';

export {PROJECTS_API, PROJECTS_PROVIDER};

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    projectRoutes,
  ],
  declarations: [
    ProjectsComponent,
    FormComponent,
    ShowComponent,
  ],
  providers: [
    {provide: PROJECTS_API, useValue: ''},
    PROJECTS_PROVIDER,
  ],
})
export class ProjectsModule {
}
