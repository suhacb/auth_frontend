import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationCreateCancelModal } from './application-create-cancel-modal';

describe('ApplicationCreateCancelModal', () => {
  let component: ApplicationCreateCancelModal;
  let fixture: ComponentFixture<ApplicationCreateCancelModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApplicationCreateCancelModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationCreateCancelModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
