import {
  ApplicationRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {SeancesService} from '../services/seances.service';
import {SeanceModel} from '../Models/seance.model';
import {MovieModel} from '../Models/movie.model';
import {moviesServices} from '../services/movies.services';
import {ActivatedRoute, Router} from '@angular/router';
import { DatePipe } from '@angular/common';
import {MonthPipePipe} from '../month.pipe';

@Component({
  selector: 'app-seances',
  templateUrl: './seances.component.html',
  styleUrls: ['./seances.component.css'],
  providers: [DatePipe, MonthPipePipe]
})
export class SeancesComponent implements OnInit, OnChanges {

  @ViewChild('seancesList') ref: ElementRef;
  date: string = this.datapipe.transform(new Date(),'yyyy-MM-dd');
  daySeances: SeanceModel[] = [];
  specificSeances: string[] = [];
  movies: MovieModel[] = [];
  seancesMap = new Map();
  mode = 0;
  editSeance: SeanceModel;
  popularity = new Map<any,any>();
  seatsInSeance: number = 0;
  reservedSeats = 0;

  constructor(private seancesService: SeancesService,
              private msService: moviesServices,
              private route: ActivatedRoute,
              private router: Router,
              private datapipe: DatePipe,
              private searchPipe: MonthPipePipe) {
  }

  ngOnInit(): void {
    this.movies = this.msService.movieList;
    this.getSeances();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.getSeances();
  }

  getSeances(): void {
    this.seancesMap = new Map<any, any>();
    this.specificSeances = new Array(0);
    this.daySeances = [];

    this.daySeances = this.seancesService.daySeancesList(this.date);

    for (let j = 0; j < this.movies.length; j++) {
      this.specificSeances = new Array(0);
      for (let i = 0; i < this.daySeances.length; i++) {
        if (this.daySeances[i].movie.name === this.movies[j].name) {
          this.specificSeances.push(this.daySeances[i].time);
          this.seatsInSeance += this.daySeances[i].room.seatsNumber;
          this.reservedSeats += this.daySeances[i].room.getReservedSeats();
        }
        this.specificSeances.sort();
        if(this.specificSeances.length !== 0)
        this.seancesMap.set(this.movies[j].name, this.specificSeances);


      }
      this.popularity.set(this.movies[j].name, this.reservedSeats / this.seatsInSeance * 10);
      console.log(this.movies[j].name + this.popularity.get(this.movies[j].name));
      this.seatsInSeance = 0;
      this.reservedSeats = 0;
    }

  }


  buyTicket(name: string, seance: any, date: string): void  {
    if (this.mode === 0) {
    this.router.navigate(['tickets'], {queryParams: {title : name, hour: seance, date}});
    }
    if (this.mode === 1){
      this.searchPipe.transform(date);
      this.editSeance = this.seancesService.getSeance(name, date, seance);
      this.router.navigate(['edit'], {relativeTo: this.route, queryParams: {title : name, hour: seance, date} });
    }

  }
  editMode(): void {
    if (this.mode !== 1) {
    this.mode = 1;
    }
    else{
      this.mode = 0;
    }
  }
  PlayingNow(date: string, time: string, duration: string): boolean{
    const actualDate = new Date(date + ':' + time );
    const durationDate = new Date('1970-01-01:' + duration).valueOf()  + actualDate.valueOf() + new Date('1970-01-01:02:00:00').valueOf();
    if (Date.now().valueOf() < durationDate
      && Date.now().valueOf() + new Date('1970-01-01:' + duration).valueOf() + new Date('1970-01-01:02:00:00').valueOf() > durationDate) {
      return false;
    }else{
      return true;
    }

  }

  addSeance(): void{
    this.router.navigate(['/seances/add']);
  }
}
