import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {moviesServices} from '../services/movies.services';
import {MovieModel} from '../Models/movie.model';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {HeaderComponent} from '../header/header.component';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  sortByNameVal = false;
  sortByDuartionVal = false;
  jsonvar;
  title = '';
  moviesList: MovieModel[] = [];
  login;
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
	var temp=this;
	$.get( 'http://localhost:8080/getUserData/' + this.getCookie("token"), function(data) {
		  		data=JSON.parse(data);
				  console.log(data);
				  temp.login = data.user.login;
		 
		});
   // this.http.get('http://localhost:8080/getUserData/' + this.getCookie("token")).subscribe((data) => {


   // });
  }

  getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  ngOnInit(): void {
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
// sort a i b do zamiany i bool gdzies
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

  onTitleChange(value) {
    console.log(this.title);

  }
}
