import {Component, OnInit} from '@angular/core';
import {MovieModel} from '../../Models/movie.model';
import {moviesServices} from '../../services/movies.services';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SeanceModel} from '../../Models/seance.model';
import {SeancesService} from '../../services/seances.service';
import {Room} from '../../Models/room.model';
import {MatDialog, MatDialogConfig, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {ErrorComponentComponent} from '../../error-component/error-component.component';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {roomsServices} from '../../services/roms.services';
import {Route, Router} from '@angular/router';

@Component({
  selector: 'app-add-seance',
  templateUrl: './add-seance.component.html',
  styleUrls: ['./add-seance.component.css']
})
export class AddSeanceComponent implements OnInit {

  date: Date;
  time: string;
  movies: MovieModel[];
  rooms: Room[];
  seanceForm: FormGroup;
  title: string;
  roomNumber: number;
  roomSeats: number;

  constructor(private msService: moviesServices,
              private seancesSerivce: SeancesService,
              private dialog: MatDialog,
              private http: HttpClient,
              private rmService: roomsServices,
              private router: Router
              ) {
  }

  ngOnInit(): void {
    this.movies = this.msService.movieList;
    this.rooms = this.rmService.roomsList;
    console.log(this.rooms);
    this.title = this.movies[0].name;
    this.seanceForm = new FormGroup({
      title: new FormControl(this.title, Validators.required),
      date: new FormControl(this.date, Validators.required),
      time: new FormControl(this.time, [Validators.required, Validators.pattern('[0-2][0-9]:[0-5][0-9]')]),
      roomNumber: new FormControl(this.roomNumber, Validators.required)
    });

  }

  addSeance(): void {
    if (this.seancesSerivce.isRoomFree(this.seanceForm.value.date, this.seanceForm.value.time,
          this.seanceForm.value.roomNumber, this.seanceForm.value.title)) {

      if (this.seanceForm.valid) {



        const headers = new HttpHeaders()
          .set('Content-Type', 'application/json');
        const httpOptions = {
          movieId: this.msService.getMovie(this.seanceForm.value.title).id,
          data: this.seanceForm.value.date,
          czas: this.seanceForm.value.time,
          roomId: this.seanceForm.value.roomNumber
        };

        const response = this.http.post('http://localhost:8080/seansAdd/' + encodeURIComponent(JSON.stringify(httpOptions)),
          {headers: headers}).subscribe(data => {

        });

        this.seancesSerivce.reloadList();
        this.router.navigate(['/seances']);

      }
    }else{
      const dialogConfig = new MatDialogConfig();
      this.dialog.open(ErrorComponentComponent, dialogConfig);
    }
  }
}
