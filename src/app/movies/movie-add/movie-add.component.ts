import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {moviesServices} from '../../services/movies.services';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-movie-add',
  templateUrl: './movie-add.component.html',
  styleUrls: ['./movie-add.component.css']
})
export class MovieAddComponent implements OnInit {
  movieForm: FormGroup;

  constructor(private msService: moviesServices,
              private router: Router,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.movieForm = new FormGroup({
      title: new FormControl('', Validators.required),
      img: new FormControl('', Validators.required),
      duration: new FormControl('', [Validators.required, Validators.pattern('[0-9]:[0-5][0-9]:[0-5][0-9]')])
    });
  }

  addMovie() {
    if (this.movieForm.valid) {
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json');
      const httpOptions = {
        nazwa: this.movieForm.value.title,
        czasTrwania: this.movieForm.value.duration,
        img: this.movieForm.value.img,
        ocena: 0
      };

      this.http.post('http://localhost:8080/movieAdd/' + encodeURIComponent(JSON.stringify(httpOptions)),
        {headers: headers}).subscribe(data => {



      });
      this.msService.addMovie(this.movieForm.value.title,
        this.movieForm.value.img,
        this.movieForm.value.duration);
      this.router.navigate(['/movies']);
    }
  }
}
