import { Component, Input, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-side-child',
  templateUrl: './side-child.component.html',
  styleUrls: ['./side-child.component.scss'],
  animations: [
    trigger('openChild', [
      state('visible', style({
        transform: 'translateX(0px)',
      })),
      state('hidden', style({
        transform: 'translateX(-410px)',
      })),
      transition('hidden => visible', animate(200)),
      transition('visible => hidden', animate(200)),
    ]),
    trigger('showBackdrop', [
      state('visible', style({
        opacity: 0.6,
        'pointer-events': 'initial',
      })),
      state('hidden', style({
        opacity: 0,
        'pointer-events': 'none',
      })),
      transition('hidden => visible', animate(300)),
      transition('visible => hidden', animate(300)),
    ]),
  ],
})
export class SideChildComponent implements OnInit {
  @Input() isChildVisible: boolean;

  constructor() {
  }

  ngOnInit(): void {
  }

}
