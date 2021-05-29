import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeancesEditComponent } from './seances-edit.component';

describe('SeancesEditComponent', () => {
  let component: SeancesEditComponent;
  let fixture: ComponentFixture<SeancesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeancesEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeancesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
