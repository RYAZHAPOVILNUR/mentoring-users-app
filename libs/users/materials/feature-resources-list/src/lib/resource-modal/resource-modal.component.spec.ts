import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResourceModalComponent } from './resource-modal.component';

describe('PfdModalComponent', () => {
  let component: ResourceModalComponent;
  let fixture: ComponentFixture<ResourceModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourceModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ResourceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
