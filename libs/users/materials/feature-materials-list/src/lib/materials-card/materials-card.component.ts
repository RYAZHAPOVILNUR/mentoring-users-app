import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { BehaviorSubject, tap } from 'rxjs';
import { TMaterialDTO } from '@users/materials/data-access';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MaterialsContentDialogComponent } from '@users/materials/feature-materials-content';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LanguageSwitchService } from '@users/users/core/ui/language-switch';
import { LanguageKeys } from '@users/users/core/ui/language-switch';

@Component({
  selector: 'materials-card',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule, AsyncPipe],
  templateUrl: './materials-card.component.html',
  styleUrls: ['./materials-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsCardComponent implements OnInit {
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  private readonly languageSwitchService = inject(LanguageSwitchService);

  @Input({ required: true })
  material!: TMaterialDTO;

  @Output() deleteMaterial = new EventEmitter();

  @Output() redirectToMaterialContent = new EventEmitter();

  private dateCreatedAtSubject$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public dateCreatedAt$ = this.dateCreatedAtSubject$.asObservable();

  ngOnInit() {
    const date = new Date(this.material.created_at);

    this.languageSwitchService.selectedLanguage$
      .pipe(
        tap((result: LanguageKeys) => {
          this.dateCreatedAtSubject$.next(
            date.toLocaleDateString(result, {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })
          );
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  private readonly isIconVisibleSubject$ = new BehaviorSubject<boolean>(false);
  public readonly isIconVisible$ = this.isIconVisibleSubject$.asObservable();

  public onShowIcon(isVisible: boolean): void {
    this.isIconVisibleSubject$.next(isVisible);
  }

  public getFileIcon(): string {
    switch (true) {
      case this.material.material_link.endsWith('.pdf'):
        return 'picture_as_pdf';
      case this.material.material_link.endsWith('.mp3'):
        return 'audiotrack';
      case this.material.material_link.includes('youtube.com'):
        return 'ondemand_video';
      default:
        return 'insert_drive_file';
    }
  }

  public onDeleteMaterial(): void {
    this.deleteMaterial.emit();
  }

  public onOpenMaterialContentDialog(): void {
    const dialogRef: MatDialogRef<MaterialsContentDialogComponent> = this.dialog.open(MaterialsContentDialogComponent, {
      minWidth: '200px',
      maxWidth: '1980px',
      data: {
        materialLink: this.material.material_link,
        title: this.material.title,
      },
      autoFocus: false,
    });
  }
}
