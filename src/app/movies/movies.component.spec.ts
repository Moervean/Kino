import {ComponentFixture, fakeAsync, flush, TestBed, tick} from '@angular/core/testing';

import { MoviesComponent } from './movies.component';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {Router, RouterModule, Routes} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HomeComponent} from '../home/home.component';
import {MovieEditComponent} from './movie-edit/movie-edit.component';
import {SeancesComponent} from '../seances/seances.component';
import {SeancesEditComponent} from '../seances/seances-edit/seances-edit.component';
import {TicketsComponent} from '../tickets/tickets.component';
import {AddSeanceComponent} from '../seances/add-seance/add-seance.component';
import {moviesServices} from '../services/movies.services';
import {SeancesService} from '../services/seances.service';
import {Location} from '@angular/common';
import {MovieAddComponent} from './movie-add/movie-add.component';

const appRoutes: Routes = [
  {path: '' , component: HomeComponent},
  {path: 'movies', component: MoviesComponent},
  {path: 'movies/add', component: MovieAddComponent},
  {path: 'movies/:name', component: MovieEditComponent},
  {path: 'seances', component: SeancesComponent},
  {path: 'seances/edit', component: SeancesEditComponent},
  {path: 'tickets', component: TicketsComponent  },
  {path: 'seances/add', component: AddSeanceComponent  },


];

describe('MoviesComponent', () => {
  let component: MoviesComponent;
  let fixture: ComponentFixture<MoviesComponent>;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        FormsModule,
        CommonModule,
        RouterModule.forRoot(appRoutes),
        NgbModule,
        ReactiveFormsModule
      ],
      declarations: [ MoviesComponent ],
      providers: [
        moviesServices,
        SeancesService,

      ]
    })
    .compileComponents();
    location = TestBed.get(Location);
  });

  it('should render Movies', () => {
    fixture = TestBed.createComponent(MoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('app-seances')).toBeTruthy('render Movies component');
  });

  it( 'movies list should update after delete', () => {
    fixture = TestBed.createComponent(MoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const clickEl = fixture.nativeElement.querySelectorAll('button:nth-of-type(2)');
    const len = component.moviesList.length;
    clickEl[0].click();
    fixture.detectChanges();
    expect(len).toEqual(component.moviesList.length + 1);
  });

  it('movie should disappear after delete', () => {
    fixture = TestBed.createComponent(MoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const clickEl = fixture.nativeElement.querySelectorAll('button:nth-of-type(2)');
    const imgEl = fixture.nativeElement.querySelectorAll('img');
    const len = component.moviesList.length;
    clickEl[len - 1].click();
    fixture.detectChanges();
    const imgEl2 = fixture.nativeElement.querySelectorAll('img');
    expect(imgEl2[len - 1]).toBeUndefined();
  });

  it('should go to /movies/add', fakeAsync(() => {
    fixture = TestBed.createComponent(MoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const clickEl = fixture.nativeElement.querySelectorAll('button');
    fixture.detectChanges();
    tick();
    clickEl[component.moviesList.length * 2].click();
    tick();
    expect(location.path()).toEqual('/movies/add');
    flush();
  }));
});
