import { Component, Input, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-expandable-list',
  templateUrl: './expandable-list.component.html',
  styleUrls: ['./expandable-list.component.scss'],
  animations: [
    trigger('openChild', [
      state('visible', style({
        height: '*',
      })),
      state('hidden', style({
        height: '0px',
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
  @Input() onEditClicked: (x) => void;

  constructor() {
  }

  ngOnInit(): void {
  }

  _itemEditClicked(x: any): void {
    if (typeof this.onEditClicked !== 'undefined') {
      this.onEditClicked(x);
    }
  }

  _onItemClicked(x: any): void {
    if (typeof this.onItemClicked !== 'undefined') {
      this.onItemClicked(x);
    }
  }

  onItemExpanded(item) {
    item.expanded = true;
  }

  onItemCollapsed(item) {
    item.expanded = false;
  }

  panStarted($event) {
    //console.log('pan started',$event);
  }
}
