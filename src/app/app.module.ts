import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MoviesComponent } from './movies/movies.component';
import { SeancesComponent } from './seances/seances.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Route, RouterModule, Routes} from '@angular/router';
import {root} from 'rxjs/internal-compatibility';
import { HomeComponent } from './home/home.component';
import { TicketsComponent } from './tickets/tickets.component';
import {moviesServices} from './services/movies.services';
import { MovieEditComponent } from './movies/movie-edit/movie-edit.component';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SeancesService} from './services/seances.service';
import { SeancesEditComponent } from './seances/seances-edit/seances-edit.component';
import { AddSeanceComponent } from './seances/add-seance/add-seance.component';
import { MonthPipePipe } from './month.pipe';
import { StyleDirective } from './Directives/style.directive';
import { MovieAddComponent } from './movies/movie-add/movie-add.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import { ErrorComponentComponent } from './error-component/error-component.component';
import {HttpClientModule, HttpHeaders} from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import {roomsServices} from './services/roms.services';
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './login/register/register.component';
import { ShopComponent } from './login/shop/shop.component';

const appRoutes: Routes = [
  {path: '' , component: HomeComponent},
  {path: 'movies', component: MoviesComponent},
  {path: 'movies/add', component: MovieAddComponent},
  {path: 'movies/:name', component: MovieEditComponent},
  {path: 'seances', component: SeancesComponent},
  {path: 'seances/edit', component: SeancesEditComponent},
  {path: 'tickets', component: TicketsComponent  },
  {path: 'seances/add', component: AddSeanceComponent  },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'shop', component: ShopComponent},


];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MoviesComponent,
    SeancesComponent,
    HomeComponent,
    TicketsComponent,
    MovieEditComponent,
    SeancesEditComponent,
    AddSeanceComponent,
    MonthPipePipe,
    StyleDirective,
    MovieAddComponent,
    ErrorComponentComponent,
    LoginComponent,
    RegisterComponent,
    ShopComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    RouterModule.forRoot(appRoutes),
    NgbModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule,

  ],
  providers: [moviesServices, SeancesService, roomsServices],
  bootstrap: [AppComponent]
})
export class AppModule { }
