import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RuslanComponent } from './ruslan.component';

describe('RuslanComponent', () => {
  let component: RuslanComponent;
  let fixture: ComponentFixture<RuslanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RuslanComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RuslanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
