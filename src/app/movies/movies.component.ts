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

  constructor(private moviesService: MoviesService) { }

  ngOnInit() {

    this.movies$ = this.moviesService.getMovies();
    debugger;
  }

}
