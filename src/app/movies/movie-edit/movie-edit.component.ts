import { Component, OnInit } from '@angular/core';
import {MovieModel} from '../../Models/movie.model';
import {moviesServices} from '../../services/movies.services';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css']
})
export class MovieEditComponent implements OnInit {
  movie: MovieModel;
  movieForm: FormGroup;

  constructor(private msService: moviesServices,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.movie = this.msService.getMovie(this.route.snapshot.params.name);
    this.movieForm = new FormGroup({
      title: new FormControl(this.movie.name, Validators.required),
      duration: new FormControl(this.movie.duration, [Validators.required, Validators.pattern('[0-9]:[0-5][0-9]:[0-5][0-9]')])
    });

  }

  editMovie() {
    if (this.movieForm.valid) {
      this.movie.name = this.movieForm.value.title;
      this.movie.duration = this.movieForm.value.duration;
      this.router.navigate(['/movies']);
    }
  }
}
