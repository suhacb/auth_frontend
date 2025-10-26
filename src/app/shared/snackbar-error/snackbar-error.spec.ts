import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackbarError } from './snackbar-error';

describe('SnackbarError', () => {
  let component: SnackbarError;
  let fixture: ComponentFixture<SnackbarError>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SnackbarError]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnackbarError);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
