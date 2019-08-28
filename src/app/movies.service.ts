import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ConfigService, Config } from './config.service';

import {Observable, of} from 'rxjs';
import {map} from "rxjs/internal/operators";

import { MoviesList, Movie } from "./movies-list"; 

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private config: Config;

  constructor(private http: HttpClient, private configService: ConfigService) { 
    this.getUrl();
  }

  getUrl(): void {
    this.configService.getConfig()
      .subscribe((config: Config) => {
        this.config = config;
      });
  }

  getMovies(): Observable<Object> {
    
    const url = "https://swapi.co/api/films";//this.config.moviesUrl;
    let results = this.http.get<MoviesList>(url).pipe(map(data => data.results));
    return results;
  }
}
