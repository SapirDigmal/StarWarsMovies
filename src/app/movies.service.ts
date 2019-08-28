import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable, of} from 'rxjs';
import {map} from "rxjs/internal/operators";

import { MoviesList, Movie } from "./movies-list"; 

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private url = "https://swapi.co/api/films";

  constructor(private http: HttpClient) { 

  }

  getMovies(): Observable<Object> {
    
    let results = this.http.get<MoviesList>(this.url).pipe(map(data => data.results));
    return results;
  }
}
