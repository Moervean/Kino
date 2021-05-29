import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {moviesServices} from '../services/movies.services';
import {MovieModel} from '../Models/movie.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  moviesList: MovieModel[];
  constructor(private mServices: moviesServices,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.moviesList = this.mServices.movieList;
    console.log(this.moviesList[0].name);

  }

  editMovie(movie: MovieModel) {
    this.router.navigate([ movie.name],{relativeTo: this.route});

  }

  removeMovie(name: string) {
    this.mServices.removeMovie(name);
  }


  addMovie() {
    this.router.navigate(['/movies/add']);
  }
}
