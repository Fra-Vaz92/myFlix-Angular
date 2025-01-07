import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-movie-dialog',
  imports: [MatDialogModule, MatIconModule ],
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