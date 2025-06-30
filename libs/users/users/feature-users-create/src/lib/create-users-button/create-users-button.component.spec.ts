import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUsersButtonComponent } from './create-users-button.component';

describe('CreateUsersButtonComponent', () => {
  let component: CreateUsersButtonComponent;
  let fixture: ComponentFixture<CreateUsersButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUsersButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateUsersButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
