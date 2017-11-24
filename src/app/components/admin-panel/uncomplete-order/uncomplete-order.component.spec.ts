import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UncompleteOrderComponent } from './uncomplete-order.component';

describe('UncompleteOrderComponent', () => {
  let component: UncompleteOrderComponent;
  let fixture: ComponentFixture<UncompleteOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UncompleteOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UncompleteOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
