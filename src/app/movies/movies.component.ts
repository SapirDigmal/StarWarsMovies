import { Component, OnInit } from '@angular/core';

import {Observable, Subject} from 'rxjs';
import {distinctUntilChanged, switchMap} from 'rxjs/operators';
import { MoviesList, Movie } from "../movies-list"; 
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  private movies$: Observable<Object>;
  private favMovies: Movie[];
  private favMode: boolean;

  constructor(private moviesService: MoviesService) { }

  ngOnInit() {

    this.movies$ = this.moviesService.getMovies();
    this.favMovies = [];
  }
 
  changeFavorite(item) {
  	if (this.favMovies.indexOf(item) == -1){
  		this.favMovies.push(item);
  		item.isFav = true; 	
  	} else {
  		this.favMovies = this.arrayRemove(this.favMovies, item);
    	item.isFav = false; 
  	}
  }

  private arrayRemove(arr, value) {

   return arr.filter(function(currItem){
   	console.log(currItem != value);
       return currItem != value;
   });
  }

}
