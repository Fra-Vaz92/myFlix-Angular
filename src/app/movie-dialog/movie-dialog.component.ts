import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-movie-dialog',
  imports: [MatDialogModule, MatIconModule, CommonModule ],
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