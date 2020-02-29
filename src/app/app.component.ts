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
    iconRegistry.addSvgIcon('keyboard-arrow-up', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/app_icons/keyboard_arrow_up.svg'));
    iconRegistry.addSvgIcon('keyboard-arrow-down', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/app_icons/keyboard_arrow_down.svg'));
    iconRegistry.addSvgIcon('build', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/app_icons/build.svg'));
    iconRegistry.addSvgIcon('save', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/app_icons/save.svg'));
    iconRegistry.addSvgIcon('delete', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/app_icons/delete.svg'));
    iconRegistry.addSvgIcon('cancel', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/app_icons/cancel.svg'));
    iconRegistry.addSvgIcon('add', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/app_icons/add.svg'));
    iconRegistry.addSvgIcon('add-o', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/app_icons/add-o.svg'));
    iconRegistry.addSvgIcon('edit', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/app_icons/edit.svg'));
  }

}
