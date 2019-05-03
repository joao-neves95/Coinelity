import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalFinancialAnalyticsComponent } from './internal-financial-analytics.component';

describe('InternalFinancialAnalyticsComponent', () => {
  let component: InternalFinancialAnalyticsComponent;
  let fixture: ComponentFixture<InternalFinancialAnalyticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternalFinancialAnalyticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalFinancialAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
