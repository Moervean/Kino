import {ComponentFixture, fakeAsync, flush, TestBed, tick} from '@angular/core/testing';

import { SeancesComponent } from './seances.component';
import {moviesServices} from '../services/movies.services';
import {SeancesService} from '../services/seances.service';
import {BrowserModule, By} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Router, RouterModule, Routes} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HomeComponent} from '../home/home.component';
import {MoviesComponent} from '../movies/movies.component';
import {MovieEditComponent} from '../movies/movie-edit/movie-edit.component';
import {SeancesEditComponent} from './seances-edit/seances-edit.component';
import {TicketsComponent} from '../tickets/tickets.component';
import {AddSeanceComponent} from './add-seance/add-seance.component';
import {Location} from '@angular/common';
import {CUSTOM_ELEMENTS_SCHEMA, inject, NgZone, NO_ERRORS_SCHEMA} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';

const appRoutes: Routes = [
  {path: '' , component: HomeComponent},
  {path: 'movies', component: MoviesComponent
  },
  {path: 'movies/:name', component: MovieEditComponent},
  {path: 'seances', component: SeancesComponent},
  {path: 'seances/edit', component: SeancesEditComponent},
  {path: 'tickets', component: TicketsComponent  },
  {path: 'seances/add', component: AddSeanceComponent  },


];
describe('SeancesComponent', () => {
  let component: SeancesComponent;
  let fixture: ComponentFixture<SeancesComponent>;
  let router: Router;
  let route: ActivatedRoute;
  let location: Location;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        FormsModule,
        CommonModule,
        RouterTestingModule.withRoutes(appRoutes),
        NgbModule,
        ReactiveFormsModule
      ],
      declarations: [ SeancesComponent, AddSeanceComponent ],
      providers: [
        moviesServices,
        SeancesService,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    await TestBed.compileComponents();


  });

  beforeEach(() => {

    router = TestBed.get(Router);
    route = TestBed.get(ActivatedRoute);
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(SeancesComponent);
    component = fixture.componentInstance;
    router.initialNavigation();
    fixture.detectChanges();
  });

  it('should render Seances', () => {

    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('app-seances')).toBeTruthy('render Seances component');
  });

  it('should change mode to 1 and return to 0', () => {
    const clickEl = fixture.nativeElement.querySelector('button:nth-of-type(2)');
    clickEl.click();
    fixture.detectChanges();
    expect(component.mode).toEqual(1);
    clickEl.click();
    fixture.detectChanges();
    expect(component.mode).toEqual(0);
    // tslint:disable-next-line:semicolon
  });

  it('should create popularity key for all movies', () => {
    component.ngOnInit();
    component.getSeances();
    expect(component.popularity.size).toEqual(component.movies.length);
  });

  it('should go to /seances/add', fakeAsync(() => {
    const clickEl = fixture.nativeElement.querySelector('button:nth-of-type(1)');
    fixture.detectChanges();
    tick();
    clickEl.click();
    tick();
    expect(location.path()).toEqual('/seances/add');
    flush();
  }));



});
