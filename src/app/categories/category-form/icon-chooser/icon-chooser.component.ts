import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-icon-chooser',
  templateUrl: './icon-chooser.component.html',
  styleUrls: ['./icon-chooser.component.scss'],
})
export class IconChooserComponent implements OnInit {
  icons: string[] = null;
  selectedIcon: string = null;
  search = new FormControl(null);
  filter = '';

  constructor(
    public dialogRef: MatDialogRef<IconChooserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.icons = data.icons;
    this.selectedIcon = data.selectedIcon;
  }

  ngOnInit(): void {
  }

  searchChanged(event) {
    this.filter = event.target.value;

  }

  onIconSelected(icon): void {
    this.selectedIcon = icon;
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onUseClick(): void {
    this.dialogRef.close(this.selectedIcon);
  }
}
