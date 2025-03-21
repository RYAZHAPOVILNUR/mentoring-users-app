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
import { TFolderVM } from '@users/materials/data-access';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LanguageSwitchService } from '@users/users/core/ui/language-switch';
import { LanguageKeys } from '@users/users/core/ui/language-switch';

@Component({
  selector: 'materials-folder-card',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule, AsyncPipe],
  templateUrl: './folders-card.component.html',
  styleUrls: ['./folders-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersCardComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly languageSwitchService = inject(LanguageSwitchService);

  @Input({ required: true })
  folder!: TFolderVM;

  @Output() deleteFolder = new EventEmitter();

  @Output() redirectToMaterials = new EventEmitter();

  public date!: Date;

  private dateCreatedAtSubject$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public dateCreatedAt$ = this.dateCreatedAtSubject$.asObservable();

  ngOnInit() {
    const date = new Date(this.folder.createdAt);

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

  public onDeleteFolder(): void {
    this.deleteFolder.emit();
  }

  public onRedirectToFolderPage(): void {
    this.redirectToMaterials.emit();
  }
}
