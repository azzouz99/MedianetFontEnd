import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderMoneyComponent } from './loader-money.component';

describe('LoaderMoneyComponent', () => {
  let component: LoaderMoneyComponent;
  let fixture: ComponentFixture<LoaderMoneyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoaderMoneyComponent]
    });
    fixture = TestBed.createComponent(LoaderMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
