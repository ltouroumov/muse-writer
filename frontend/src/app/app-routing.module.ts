import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {LoginComponent} from './login/login.component';
import {MainComponent} from './main/main.component';
// import { DashboardProductComponent } from './dashboard-product/dashboard-product.component';
// import { ProductOverviewComponent } from './dashboard-product/overview/overview.component';
// import { ProductStatsComponent } from './dashboard-product/stats/stats.component';
// import { ProductFeaturesComponent } from './dashboard-product/features/features.component';
// import { FeaturesFormComponent } from './dashboard-product/features/form/form.component';
// import { LogsComponent } from './logs/logs.component';
// import { DetailComponent } from './detail/detail.component';
// import { FormComponent } from './form/form.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'projects',
        pathMatch: 'full',
      },
      {
        path: '',
        loadChildren: './projects/projects.module#ProjectsModule',
      },
      {
        path: '',
        loadChildren: './editor/editor.module#EditorModule',
      }
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash: true}),
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule {
}
export const routedComponents: any[] = [
  MainComponent, LoginComponent,
  // DashboardProductComponent,
  // FormComponent, LogsComponent, DetailComponent,
  // FeaturesFormComponent, ProductFeaturesComponent, ProductOverviewComponent, ProductStatsComponent,
];
