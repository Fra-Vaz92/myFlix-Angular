import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  GetUserDataService,
  EditUserService,
  DeleteUserService,
  GetAllMoviesService,
  RemoveFromFavoritesService,
} from '../fetch-api-data.service';
import { MovieDialogComponent } from '../movie-dialog/movie-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile-view',
  standalone: false,
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss'],
})

export class ProfileViewComponent implements OnInit {
  userData: any = {};
  editForm: FormGroup;
  isEditing: boolean = false;
  favoriteMovies: any[] = [];
  isLoading: boolean = true; 

  constructor(
    private getUserDataService: GetUserDataService,
    private getAllMoviesService: GetAllMoviesService,
    private editUserService: EditUserService,
    private formBuilder: FormBuilder,
    private deleteUserService: DeleteUserService,
    public dialog: MatDialog,
    public router: Router,
    public removeFromFavoritesService: RemoveFromFavoritesService,
    private snackBar: MatSnackBar
  ) {
    this.editForm = this.formBuilder.group({
      Username: [''],
      Password: [''],
      Email: [''],
      Birthday: [''],
    });
  }

  ngOnInit(): void {
    this.getUserDataService.getUserData().subscribe((resp: any) => {
      this.userData = resp;
      this.loadFavoriteMovies();
    });
  }

  getUserData(): void {
    this.getUserDataService.getUserData().subscribe((resp: any) => {
      this.userData = resp;

      if (this.userData.FavoriteMovies?.length > 0) {
        this.loadFavoriteMovies();
      } else {
        this.isLoading = false;
      }

      this.editForm.patchValue({
        Username: this.userData.Username,
        Email: this.userData.Email,
        Birthday: this.userData.Birthday,
      });
    });
  }

  enableEdit(): void {
    this.isEditing = true;
  }

  saveChanges(): void {
    if (this.editForm.valid) {
      this.editUserService
        .editUser(this.editForm.value)
        .subscribe((resp: any) => {
  
          this.isEditing = false;
          this.getUserData();
        });
    }
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editForm.patchValue({
      Username: this.userData.Username,
      Email: this.userData.Email,
      Birthday: this.userData.Birthday,
    });
  }

  confirmDelete(): void {
    const confirmDelete = confirm(
      'Are you sure you want to delete your profile? This action is irreversible.'
    );
    if (confirmDelete) {
      this.deleteProfile();
    }
  }

  
  deleteProfile(): void {
    this.deleteUserService.deleteUser().subscribe(
      () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        alert('Your profile has been deleted.');
        window.location.href = '/login'; 
      }
    );
  }

  loadFavoriteMovies(): void {
    this.getAllMoviesService.getAllMovies().subscribe(
      (movies: any[]) => {
   
        this.favoriteMovies = movies.filter((movie) =>
          this.userData.FavoriteMovies.includes(movie._id)
        );
    
        this.isLoading = false; 
      },
      (err: any) => {
        this.isLoading = false; 
      }
    );
  }

  openDialog(type: string, data: any): void {
    this.dialog.open(MovieDialogComponent, {
      data: { type, data },
      width: '400px',
    });
  }

  removeFavorite(movie: any): void {
    this.removeFromFavoritesService.removeFromFavorites(movie._id).subscribe(
      () => {
        this.favoriteMovies = this.favoriteMovies.filter(
          (favMovie) => favMovie._id !== movie._id
        ); 
        this.snackBar.open(`${movie.Title} removed from favorites.`, 'OK', {
          duration: 3000,
        });
      },
      (error) => {
        this.snackBar.open(
          `Could not remove ${movie.Title} from favorites.`,
          'OK',
          { duration: 3000 }
        );
      }
    );
  }
}