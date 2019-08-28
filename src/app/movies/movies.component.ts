import { Component, OnInit } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {map} from "rxjs/internal/operators";
import {distinctUntilChanged, switchMap} from 'rxjs/operators';
import { MoviesList, Movie } from "../movies-list"; 
import { MoviesService } from '../movies.service';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  private movies$: Observable<Movie[]>;
  private favMovies: Movie[];

  constructor(private moviesService: MoviesService) { }

  ngOnInit() {

	let storageFavMovies = JSON.parse(localStorage.getItem("favoriteMovies"));
    this.favMovies = storageFavMovies ? storageFavMovies : new Array<Movie>();
    this.movies$ = this.moviesService.getMovies().pipe(map((movies : Array<Movie>) => { 
    	
    	movies.forEach((movie : any) => {
    		movie.isFav = this.favMovies.indexOf(movie.episode_id) !== -1; 
    	}); 
    	return movies;
    	}));
  }
 
  changeFavorite(item) {

  	if (this.favMovies.indexOf(item.episode_id) === -1){
  		this.favMovies.push(item.episode_id);
  		item.isFav = true; 	
  	} else {
  		this.favMovies = this.arrayRemove(this.favMovies, item.episode_id);
    	item.isFav = false; 
  	}

  	this.saveFavorites ();
  }

  private saveFavorites (): void {
    localStorage.setItem("favoriteMovies", JSON.stringify(this.favMovies));
  }

  private arrayRemove(arr, value) {

   return arr.filter(function(currItem){
       return currItem != value;
   });
  }

}
