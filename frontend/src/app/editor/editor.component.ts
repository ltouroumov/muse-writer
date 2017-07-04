import {Component, OnInit} from '@angular/core';
import {TdDialogService, TdLoadingService} from '@covalent/core';
import {IProject, ProjectsService} from '../projects/services/projects.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectDocument} from './project-document';

class ProjectBinder {
  id: string;
  name: string;
}

@Component({
  selector: 'muse-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit {

  id: number = 0;

  project: IProject = null;

  curBinder: ProjectBinder;

  binders: ProjectBinder[] = [
    {id: 'manuscript', name: 'Manuscript'},
    {id: 'notes', name: 'Notes'},
    {id: 'research', name: 'Research'},
  ];

  documents: ProjectDocument[] = [
    {id: 1, name: 'Doc 1', children: []},
    {
      id: 2, name: 'Doc 2', children: [
      {id: 9, name: 'Doc 2.1', children: []},
      {id: 10, name: 'Doc 2.2', children: []},
      {id: 11, name: 'Doc 2,3', children: []},
    ],
    },
    {
      id: 3, name: 'Doc 3', children: [
      {id: 6, name: 'Doc 3.1', children: []},
      {id: 7, name: 'Doc 3.2', children: []},
      {id: 8, name: 'Doc 3,3', children: []},
    ],
    },
    {id: 4, name: 'Doc 4', children: []},
    {id: 5, name: 'Doc 5', children: []},
  ];

  constructor(private _loadingService: TdLoadingService,
              private _projectsService: ProjectsService,
              private _dialogService: TdDialogService,
              private _router: Router,
              private _route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this._route.params.subscribe((params: { id: string }) => {
      this.id = parseInt(params['id'], 10);
      this.fetchProject(this.id);
    });
    this.curBinder = this.binders[0];
  }

  private fetchProject(pid: number): void {
    this._loadingService.register('project.load');
    this._projectsService.get(pid).subscribe(
      (value: IProject) => {
        console.log('project', value);
        this.project = value;
        this._loadingService.resolve('project.load');
      },
      (error: Error) => {
        console.log("Can't find project");
      },
    );
  }
}
