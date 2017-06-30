import {NgModule, Type} from '@angular/core';
import {BrowserModule, Title}  from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {CovalentHttpModule, IHttpInterceptor} from '@covalent/http';
import {CovalentHighlightModule} from '@covalent/highlight';
import {CovalentMarkdownModule} from '@covalent/markdown';

import {AppComponent} from './app.component';
import {RequestInterceptor} from '../config/interceptors/request.interceptor';
import {API_BASE_URL} from '../config/api.config';

import {routedComponents, AppRoutingModule} from './app-routing.module';

import {SharedModule} from './shared/shared.module';

import {USER_PROVIDER, USERS_API} from './users';
import {PROJECTS_PROVIDER, PROJECTS_API} from './projects/services/projects.service';

const httpInterceptorProviders: Type<any>[] = [
  RequestInterceptor,
];

export function getAPI(): string {
  return API_BASE_URL;
}

@NgModule({
  declarations: [
    AppComponent,
    routedComponents,
  ], // directives, components, and pipes owned by this NgModule
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    CovalentHttpModule.forRoot({
      interceptors: [{
        interceptor: RequestInterceptor, paths: ['**'],
      }],
    }),
    CovalentHighlightModule,
    CovalentMarkdownModule,
  ], // modules needed to run this module
  providers: [
    httpInterceptorProviders,
    Title, {
      provide: USERS_API, useFactory: getAPI,
    }, USER_PROVIDER,
    {
      provide: PROJECTS_API, useFactory: getAPI,
    }, PROJECTS_PROVIDER,
  ], // additional providers needed for this module
  entryComponents: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
