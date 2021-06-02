import { Component, OnInit } from '@angular/core';
import {MovieModel} from '../../Models/movie.model';
import {moviesServices} from '../../services/movies.services';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';

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
              private router: Router,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.movie = this.msService.getMovie(this.route.snapshot.params.name);
    this.movieForm = new FormGroup({
      title: new FormControl(this.movie.name, Validators.required),
      duration: new FormControl(this.movie.duration, [Validators.required, Validators.pattern('[0-9]:[0-5][0-9]:[0-5][0-9]')])
    });

  }

  editMovie() {
    if (this.movieForm.valid) {


      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json');
      const httpOptions = {
        nazwa: this.movieForm.value.title,
        czasTrwania: this.movieForm.value.duration
      };

      console.log(this.msService.getMovie(this.movie.name).id);

      this.http.post('http://localhost:8080/movieEdit/' + this.msService.getMovie(this.movie.name).id + '/'
        + encodeURIComponent(JSON.stringify(httpOptions)),
        {headers: headers}).subscribe(data => {
        console.log(data);
      });
      this.movie.name = this.movieForm.value.title;
      this.movie.duration = this.movieForm.value.duration;
      this.router.navigate(['/movies']);
    }
  }
}

