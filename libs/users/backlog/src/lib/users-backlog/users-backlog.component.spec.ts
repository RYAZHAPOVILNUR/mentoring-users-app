import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BacklogComponent } from './users-backlog.component';

describe('UsersBacklogComponent', () => {
  let component: BacklogComponent;
  let fixture: ComponentFixture<BacklogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BacklogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BacklogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
