import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {moviesServices} from '../services/movies.services';
import {MovieModel} from '../Models/movie.model';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  sortByNameVal = false;
  sortByDuartionVal = false;
  jsonvar;
  moviesList: MovieModel[] = [];
  constructor(private mServices: moviesServices,
              private route: ActivatedRoute,
              private router: Router,
              private http: HttpClient) {
    // this.mServices.init().then(res => {
    //
    //   this.mServices.movieList.forEach(val => this.moviesList.push(val)
    //   );
    //
    // });
  }

  ngOnInit():void {
    this.moviesList = this.mServices.movieList;
  }

  editMovie(movie: MovieModel) {
    this.router.navigate([ movie.name], {relativeTo: this.route});

  }

  removeMovie(name: string) {
    this.mServices.removeMovie(name);

  }


  addMovie() {
    this.router.navigate(['/movies/add']);
  }

  sortByName() {
    console.log(this.mServices.movieList);
    this.sortByNameVal = !this.sortByNameVal;
    this.moviesList = [];
    this.mServices.movieList.forEach(val => this.moviesList.push(val));
    if (this.sortByDuartionVal){
      this.moviesList.sort((a, b) => a.duration.localeCompare(b.duration));
    }
    if (this.sortByNameVal){
      this.moviesList.sort((a, b) => a.name.localeCompare(b.name));
    }
  }

  sortByDuration() {
    console.log(this.mServices.movieList);
    this.sortByDuartionVal = !this.sortByDuartionVal;
    this.moviesList = [];
    this.mServices.movieList.forEach(val => this.moviesList.push(val));
    if (this.sortByDuartionVal){
      this.moviesList.sort((a, b) => a.duration.localeCompare(b.duration));
    }
    if (this.sortByNameVal){
      this.moviesList.sort((a, b) => a.name.localeCompare(b.name));
    }
  }
}
