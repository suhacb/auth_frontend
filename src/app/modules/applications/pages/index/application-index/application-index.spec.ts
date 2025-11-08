import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationIndex } from './application-index';

describe('ApplicationIndex', () => {
  let component: ApplicationIndex;
  let fixture: ComponentFixture<ApplicationIndex>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApplicationIndex]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationIndex);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
