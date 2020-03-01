import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';

/** @title Responsive sidenav */
@Component({
  selector: 'app-sidebar',
  templateUrl: 'layout.component.html',
  styleUrls: ['layout.component.scss'],
})
export class LayoutComponent implements OnDestroy, OnInit {
  mobileQuery: MediaQueryList;
  private readonly mobileQueryListener: () => void;
  loading = true;
  pageTitle: string;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, appService: AppService, private router: Router, private route: ActivatedRoute) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);

    appService.requestStarted.subscribe(nrOfActiveRequests => {
      if (nrOfActiveRequests > 0) {
        setTimeout(() => {
          this.loading = true;
        }, 0);
      }
    });

    appService.requestFinished.subscribe(nrOfActiveRequests => {
      if (nrOfActiveRequests === 0) {
        setTimeout(() => {
          this.loading = false;
        }, 0);
      }
    });
  }

  ngOnInit(): void {
    this.router
      .events
      .pipe(
        map(() => {
          let route = this.route.firstChild;
          let child = route;

          while (child) {
            if (child.firstChild) {
              child = child.firstChild;
              route = child;
            } else {
              child = null;
            }
          }
          return route;
        }),
      )
      .subscribe(route => {
        if (route !== null) {
          this.pageTitle = route.data['_value'].title;// tslint:disable-line
        }
      });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }
}
