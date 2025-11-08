import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationUpdateConfirmModal } from './application-update-confirm-modal';

describe('ApplicationUpdateConfirmModal', () => {
  let component: ApplicationUpdateConfirmModal;
  let fixture: ComponentFixture<ApplicationUpdateConfirmModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApplicationUpdateConfirmModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationUpdateConfirmModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
