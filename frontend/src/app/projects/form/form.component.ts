import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {IProject, ProjectsService} from '../services/projects.service';
import {TdLoadingService} from '@covalent/core';

@Component({
  selector: 'muse-project-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {

  action: String = 'Edit';

  id: number = 0;

  project: IProject = {
    id: 0,
    title: '',
    summary: '',
    words: 0,
    documents: 0,
    created_date: new Date(),
    updated_date: new Date(),
  };

  constructor(private _loadingService: TdLoadingService,
              private _projectsService: ProjectsService,
              private _router: Router,
              private _route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this._route.url.subscribe((url: any) => {
      this.action = (url.length > 1 ? 'Edit' : 'Add');
    });
    this._route.params.subscribe((params: {id: string}) => {
      this.id = parseInt(params.id, 10);
      this.fetchProject(this.id);
    });
  }

  goBack(): void {
    if (this.id) {
      this._router.navigate(['/projects', this.id]);
    } else {
      this._router.navigate(['/projects']);
    }
  }

  save(): void {
    if (this.id) {
      this.updateProject(this.id, this.project);
    } else {
      this.createProject(this.project);
    }
  }

  private createProject(project: IProject): void {
    this._projectsService.create(project).subscribe((res: IProject) => {
      this._projectsService.onProjectChange.emit(0);
      this.goBack();
    }, (err: Error) => {
      // Show error!
    });
  }

  private updateProject(id: number, project: IProject): void {
    this._projectsService.update(id, project).subscribe((res: IProject) => {
      this._projectsService.onProjectChange.emit(id);
      this.goBack();
    }, (err: Error) => {
      // Show error!
    });
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
