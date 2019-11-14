import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutRoomPage } from './about-room.page';

describe('AboutRoomPage', () => {
  let component: AboutRoomPage;
  let fixture: ComponentFixture<AboutRoomPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutRoomPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutRoomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
