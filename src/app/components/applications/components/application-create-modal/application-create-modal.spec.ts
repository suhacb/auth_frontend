import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationCreateModal } from './application-create-modal';

describe('ApplicationCreateModal', () => {
  let component: ApplicationCreateModal;
  let fixture: ComponentFixture<ApplicationCreateModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApplicationCreateModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationCreateModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
