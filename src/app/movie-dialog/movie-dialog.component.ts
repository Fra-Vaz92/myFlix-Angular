import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-dialog',
  standalone: false,
  templateUrl: './movie-dialog.component.html',
  styleUrl: './movie-dialog.component.scss',
})

export class MovieDialogComponent {
  type: string | undefined;
  data: any;
  dialogTitle: string | undefined;

  constructor(@Inject(MAT_DIALOG_DATA) public injectedData: any) {
    console.log('Injected Data:', injectedData);
    this.type = injectedData.type;
    this.data = injectedData.data;

    console.log('Type:', this.type);
    console.log('Data:', this.data); 
  }
}