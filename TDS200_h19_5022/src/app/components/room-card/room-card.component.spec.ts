import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomCardComponent } from './room-card.component';

describe('RoomCardComponent', () => {
  let component: RoomCardComponent;
  let fixture: ComponentFixture<RoomCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomCardComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
