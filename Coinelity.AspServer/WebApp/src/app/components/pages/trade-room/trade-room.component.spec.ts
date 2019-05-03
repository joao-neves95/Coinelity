import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeRoomComponent } from './trade-room.component';

describe('TradeRoomComponent', () => {
  let component: TradeRoomComponent;
  let fixture: ComponentFixture<TradeRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
