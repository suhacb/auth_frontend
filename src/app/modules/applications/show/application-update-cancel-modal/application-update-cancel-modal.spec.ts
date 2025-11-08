import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationUpdateCancelModal } from './application-update-cancel-modal';

describe('ApplicationUpdateCancelModal', () => {
  let component: ApplicationUpdateCancelModal;
  let fixture: ComponentFixture<ApplicationUpdateCancelModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApplicationUpdateCancelModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationUpdateCancelModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
