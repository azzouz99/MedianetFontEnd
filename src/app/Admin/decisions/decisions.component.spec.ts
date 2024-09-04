import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecisionsComponent } from './decisions.component';

describe('DecisionsComponent', () => {
  let component: DecisionsComponent;
  let fixture: ComponentFixture<DecisionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DecisionsComponent]
    });
    fixture = TestBed.createComponent(DecisionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
