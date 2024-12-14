import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialsListCardComponent } from './materials-list-card.component';

describe('MaterialsListCardComponent', () => {
  let component: MaterialsListCardComponent;
  let fixture: ComponentFixture<MaterialsListCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialsListCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MaterialsListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
