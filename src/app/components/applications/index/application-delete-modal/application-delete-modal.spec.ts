import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationDeleteModal } from './application-delete-modal';

describe('ApplicationDeleteModal', () => {
  let component: ApplicationDeleteModal;
  let fixture: ComponentFixture<ApplicationDeleteModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApplicationDeleteModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationDeleteModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
