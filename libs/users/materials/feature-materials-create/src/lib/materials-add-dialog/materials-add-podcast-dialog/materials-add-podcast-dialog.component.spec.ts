import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialsAddPodcastDialogComponent } from './materials-add-podcast-dialog.component';

describe('MaterialsAddPodcastDialogComponent', () => {
  let component: MaterialsAddPodcastDialogComponent;
  let fixture: ComponentFixture<MaterialsAddPodcastDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialsAddPodcastDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MaterialsAddPodcastDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
