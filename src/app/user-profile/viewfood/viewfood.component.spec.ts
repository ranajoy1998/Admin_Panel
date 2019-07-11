import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewfoodComponent } from './viewfood.component';

describe('ViewfoodComponent', () => {
  let component: ViewfoodComponent;
  let fixture: ComponentFixture<ViewfoodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewfoodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewfoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
