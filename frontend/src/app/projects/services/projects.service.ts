import {Provider, SkipSelf, Optional, InjectionToken, EventEmitter} from '@angular/core';
import {Response, Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import {HttpInterceptorService, IRestTransform, RESTService} from '@covalent/http';

export interface IProject {
  id: number;
  title: string;
  summary: string;
  words: number;
  documents: number;
  created_date: Date;
  updated_date: Date;
}

export let defaultProjectTransform: IRestTransform = (res: Response) => res.json();

export let makeProjectTransform: (next: (data: any) => IProject) => IRestTransform = (next: IRestTransform) => {
  return (res: Response) => next(defaultProjectTransform(res));
};

export class ProjectsService extends RESTService<IProject> {

  public onProjectChange: EventEmitter<number> = new EventEmitter();

  constructor(private _http: HttpInterceptorService, api: string) {
    super(_http, {
      baseUrl: api,
      path: '/project',
      transform: defaultProjectTransform,
    });
  }
}

export const PROJECTS_API: InjectionToken<string> = new InjectionToken<string>('PROJECTS_API');

export function PROJECTS_API_FACTORY(parent: ProjectsService,
                                     interceptorHttp: HttpInterceptorService,
                                     api: string): ProjectsService {
  return parent || new ProjectsService(interceptorHttp, api);
}

export const PROJECTS_PROVIDER: Provider = {
  // If there is already a service available, use that. Otherwise, provide a new one.
  provide: ProjectsService,
  deps: [[new Optional(), new SkipSelf(), ProjectsService], HttpInterceptorService, PROJECTS_API],
  useFactory: PROJECTS_API_FACTORY,
};
