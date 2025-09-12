import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditStorypointsComponent } from './edit-storypoints.component';

describe('EditStorypointsComponent', () => {
  let component: EditStorypointsComponent;
  let fixture: ComponentFixture<EditStorypointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditStorypointsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditStorypointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
