import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {SeanceModel} from '../../Models/seance.model';
import {SeancesService} from '../../services/seances.service';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ErrorComponentComponent} from '../../error-component/error-component.component';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {moviesServices} from '../../services/movies.services';

@Component({
  selector: 'app-seances-edit',
  templateUrl: './seances-edit.component.html',
  styleUrls: ['./seances-edit.component.css']
})
export class SeancesEditComponent implements OnInit {
  title: string;
  date: string;
  time: string;
  seance: SeanceModel;
  movieForm: FormGroup;
  constructor(private route: ActivatedRoute,
              private seanceService: SeancesService,
              private router: Router,
              private dialog: MatDialog,
              private mService: moviesServices,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      (params: Params) => {
        this.title = params.title;
        this.time = params.hour;
        this.date = params.date;
        this.seance = this.seanceService.getSeance(this.title, this.date, this.time);
        console.log(this.seance);
      }
    );
    this.movieForm = new FormGroup({
      time: new FormControl(this.seance.time, [Validators.required, Validators.pattern('[0-2][0-9]:[0-5][0-9]')]),
      date: new FormControl(this.seance.date),
      roomNumber: new FormControl(this.seance.room.roomNumber, [Validators.required, Validators.pattern('^[0-9]*$')])
    });
  }

  editSeance() {
    if (this.seanceService.isRoomFree(this.movieForm.value.date, this.movieForm.value.time, this.movieForm.value.roomNumber, this.title)) {
      if (this.movieForm.valid) {
        this.seance.time = this.movieForm.value.time;
        this.seance.date = this.movieForm.value.date;
        this.seance.room.roomNumber = this.movieForm.value.roomNumber;

        const headers = new HttpHeaders()
          .set('Content-Type', 'application/json');
        const httpOptions = {
          data: this.movieForm.value.date,
          czas: this.movieForm.value.time,
          roomId: this.movieForm.value.roomNumber
        };

        this.http.post('http://localhost:8080/seansEdit/' + this.seance.id + '/' + encodeURIComponent(JSON.stringify(httpOptions)),
          {headers: headers}).subscribe(data => {

        });
        this.router.navigate(['/seances'], {queryParams: {date: this.seance.date}});
      }
    }else{
      const dialogConfig = new MatDialogConfig();
      this.dialog.open(ErrorComponentComponent, dialogConfig);
    }
  }
}
