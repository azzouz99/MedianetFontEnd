import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogcleanComponent } from './dialogclean.component';

describe('DialogcleanComponent', () => {
  let component: DialogcleanComponent;
  let fixture: ComponentFixture<DialogcleanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogcleanComponent]
    });
    fixture = TestBed.createComponent(DialogcleanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
