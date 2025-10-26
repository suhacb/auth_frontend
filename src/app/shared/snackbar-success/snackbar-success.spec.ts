import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackbarSuccess } from './snackbar-success';

describe('SnackbarSuccess', () => {
  let component: SnackbarSuccess;
  let fixture: ComponentFixture<SnackbarSuccess>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SnackbarSuccess]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnackbarSuccess);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
