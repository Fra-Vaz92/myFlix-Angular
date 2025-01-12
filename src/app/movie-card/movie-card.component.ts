import { Component } from '@angular/core';
import {
  AddToFavoritesService,
  GetAllMoviesService,
  GetUserDataService,
  RemoveFromFavoritesService,
} from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieDialogComponent } from '../movie-dialog/movie-dialog.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AppStorageService } from '../app-storage.service';
import { MatGridListModule } from '@angular/material/grid-list';


@Component({
  selector: 'app-movie-card',
  imports: [MatIconModule, CommonModule, MatInputModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatGridListModule],
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent {
  movies: any[] = [];
  favoriteMovies: string[] = [];

  constructor(
    public fetchApiData: GetAllMoviesService,
    public getUserDataService: GetUserDataService,
    public addToFavoritesService: AddToFavoritesService,
    public removeFromFavoritesService: RemoveFromFavoritesService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    public router: Router,
    public appStorage: AppStorageService 
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies(); // Fetch favorites on initialization
  }

    /**
    * Method  to call getMovies API and assign data to the movie List variable
    * Assign favorite flag to the movie variable based on user data 
    * @method getMovies 
    */

  //get movies from the database
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
    });
  }

  // Opens the movie page with the movie details.
  openDialog(type: string, data: any): void {
    console.log('Dialog Type:', type);
    console.log('Dialog Data:', data);
    this.dialog.open(MovieDialogComponent, {
      data: { type, data },
      width: '400px',
    });
  }

    /**
    * Method  to call AddToFavoritesService API and add movies to favorite list
    * Assign favorite flag to the movie variable based on user data 
    * @method getFavoriteMovies 
    */

  getFavoriteMovies(): void {
    this.getUserDataService.getUserData().subscribe((resp: any) => {
      this.favoriteMovies = resp.FavoriteMovies || [];
      console.log('Favorite Movies:', this.favoriteMovies);
    });
  }

 //check if is favorite or not
  isFavorite(movie: any): boolean {
    return this.favoriteMovies.includes(movie._id);
  }

      /**
    * Method  to call AddToFavoritesService API and add movies to favorite list with toggle action
    * Assign favorite flag to the movie variable based on user data, remove favorite movies from the list
    * @method getFavoriteMovies
    * @method removeFromFavoritesService
    */

  toggleFavorite(movie: any): void {
    if (this.isFavorite(movie)) {
      this.removeFromFavoritesService.removeFromFavorites(movie._id).subscribe(
        () => {
          console.log(`${movie.Title} removed from favorites.`);
          this.favoriteMovies = this.favoriteMovies.filter((id) => id !== movie._id); // Ensure change detection
          this.snackBar.open(`${movie.Title} removed from favorites.`, 'OK', {
            duration: 3000,
          });
        },
        (error) => {
          console.error(`Error removing ${movie.Title} from favorites:`, error);
          this.snackBar.open(
            `Could not remove ${movie.Title} from favorites.`,
            'OK',
            { duration: 3000 }
          );
        }
      );
    } else {
      this.addToFavoritesService.addToFavorites(movie._id).subscribe(
        () => {
          console.log(`${movie.Title} added to favorites.`);
          this.favoriteMovies = [...this.favoriteMovies, movie._id]; // Ensure change detection
          this.snackBar.open(`${movie.Title} added to favorites.`, 'OK', {
            duration: 3000,
          });
        },
        (error: any) => {
          console.error(`Error adding ${movie.Title} to favorites:`, error);
          this.snackBar.open(
            `Could not add ${movie.Title} to favorites.`,
            'OK',
            { duration: 3000 }
          );
        }
      );
    }
  }
}