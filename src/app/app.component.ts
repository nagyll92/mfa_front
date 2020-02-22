import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'learn-proj-ng';

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('keyboard-arrow-up', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/keyboard_arrow_up.svg'));
    iconRegistry.addSvgIcon('keyboard-arrow-down', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/keyboard_arrow_down.svg'));
    iconRegistry.addSvgIcon('build', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/build.svg'));
  }

}
