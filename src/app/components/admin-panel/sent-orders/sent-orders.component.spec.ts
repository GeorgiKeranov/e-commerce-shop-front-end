import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SentOrdersComponent } from './sent-orders.component';

describe('SentOrdersComponent', () => {
  let component: SentOrdersComponent;
  let fixture: ComponentFixture<SentOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SentOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SentOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
