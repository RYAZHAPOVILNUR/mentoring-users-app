import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResourcesListContainerComponent } from './resources-list-container.component';

describe('ResourcesListContainerComponent', () => {
  let component: ResourcesListContainerComponent;
  let fixture: ComponentFixture<ResourcesListContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourcesListContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ResourcesListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
