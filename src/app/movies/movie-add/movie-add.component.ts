import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {moviesServices} from '../../services/movies.services';
import {Router} from '@angular/router';

@Component({
  selector: 'app-movie-add',
  templateUrl: './movie-add.component.html',
  styleUrls: ['./movie-add.component.css']
})
export class MovieAddComponent implements OnInit {
  movieForm: FormGroup;

  constructor(private msService: moviesServices,
              private router: Router) { }

  ngOnInit(): void {
    this.movieForm = new FormGroup({
      title: new FormControl('', Validators.required),
      img: new FormControl('', Validators.required),
      duration: new FormControl('', [Validators.required, Validators.pattern('[0-9]:[0-5][0-9]:[0-5][0-9]')])
    });
  }

  addMovie() {
    if (this.movieForm.valid) {
      this.msService.addMovie(this.movieForm.value.title,
        this.movieForm.value.img,
        this.movieForm.value.duration);
      this.router.navigate(['/movies']);
    }
  }
}
