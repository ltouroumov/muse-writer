import {Component, OnInit} from '@angular/core';

import {projectList} from '../data';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {defaultProjectTransform, IProject, makeProjectTransform, ProjectsService} from '../services/projects.service';
import {TdDialogService, TdLoadingService} from '@covalent/core';
import {Response} from '@angular/http';

@Component({
  selector: 'muse-project-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss'],
})
export class ShowComponent implements OnInit {

  id: number = 0;

  project: Object = null;

  constructor(private _loadingService: TdLoadingService,
              private _projectsService: ProjectsService,
              private _dialogService: TdDialogService,
              private _router: Router,
              private _route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this._route.params.subscribe((params: Params) => {
      this.id = parseInt(params['id'], 10);
      this.fetchProject(this.id);
    });
  }

  deleteProject(): void {
    this._dialogService.openConfirm({
      title: 'Delete Project?',
      message: 'This will delete the project and all associated content!\nThis action is irreversible.',
      cancelButton: 'Cancel',
      acceptButton: 'Delete',
    }).afterClosed().subscribe((accept: boolean) => {
      this._projectsService.delete(this.id).subscribe(() => {
        this._projectsService.onProjectChange.emit(this.id);
        this._router.navigate(['/projects']);
      }, (err: Error) => {
        console.log('Error deleting the project.');
      });
    });
  }

  private fetchProject(pid: number): void {
    this._loadingService.register('project.load');
    this._projectsService.get(pid).subscribe(
      (value: IProject) => {
        console.log("project", value);
        this.project = value;
        this._loadingService.resolve('project.load');
      },
      (error: Error) => {
        console.log("Can't find project");
      },
    );
  }
}
