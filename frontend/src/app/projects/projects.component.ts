import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Response} from '@angular/http';
import {Title} from '@angular/platform-browser';
import {TdLoadingService, TdMediaService} from '@covalent/core';
import {ItemsService, ProductsService, AlertsService} from '../../services';
import {ProjectsService} from './services/projects.service';
import {Event, Router} from '@angular/router';
import {IProject} from './services/project.model';

@Component({
  selector: 'muse-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  viewProviders: [ItemsService, ProductsService, AlertsService],
})
export class ProjectsComponent implements AfterViewInit, OnInit {

  projects: Object[] = [];

  constructor(private _titleService: Title,
              private _loadingService: TdLoadingService,
              private _changeDetectorRef: ChangeDetectorRef,
              private _projectsService: ProjectsService,
              private _router: Router,
              public media: TdMediaService) {
    this._router.events.subscribe((evt: Event) => {
      console.log('Routing event', evt);
    });
    this._projectsService.onProjectChange.subscribe((pid: number) => {
      this.refreshProjects();
    });
  }

  ngOnInit(): void {
    this._titleService.setTitle('Covalent Quickstart');
    this.refreshProjects();
  }

  ngAfterViewInit(): void {
    // broadcast to all listener observables when loading the page
    this.media.broadcast();
    // force a new change detection cycle since change detections
    // have finished when `ngAfterViewInit` is executed
    this._changeDetectorRef.detectChanges();
  }

  private refreshProjects(): void {
    this._loadingService.register('projects.load');
    this._projectsService.query(null, (res: Response) => res.json()['objects']).subscribe((items: IProject[]) => {
      this.projects = items;
      this._loadingService.resolve('projects.load');
    }, (error: Error) => {
      console.log('Error loading projects');
    });
  }

}
