import { Component, Input, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-expandable-list',
  templateUrl: './expandable-list.component.html',
  styleUrls: ['./expandable-list.component.scss'],
  animations: [
    trigger('openChild', [
      state('visible', style({
        maxHeight: '100px',
      })),
      state('hidden', style({
        maxHeight: '0px',
      })),
      transition('hidden => visible', animate(300)),
      transition('visible => hidden', animate(300)),
    ]),
  ],
})
export class ExpandableListComponent implements OnInit {
  @Input() listItems;
  @Input() displayValue;
  @Input() onItemClicked: (x) => void;

  constructor() {
  }

  ngOnInit(): void {
  }

  onItemExpanded(item) {
    item.expanded = true;
  }

  onItemCollapsed(item) {
    item.expanded = false;
  }
}
