import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { AppService } from '../../app.service';

/** @title Responsive sidenav */
@Component({
  selector: 'app-sidebar',
  templateUrl: 'layout.component.html',
  styleUrls: ['layout.component.scss'],
})
export class LayoutComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  private readonly mobileQueryListener: () => void;
  loading = true;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, appService: AppService) {
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

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }
}
