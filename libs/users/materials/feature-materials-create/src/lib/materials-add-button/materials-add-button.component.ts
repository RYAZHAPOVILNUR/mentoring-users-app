import { ChangeDetectionStrategy, Component, DestroyRef, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateMaterialDTO, MaterialsFacade } from '@users/materials/data-access';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MaterialsAddDialogComponent } from '../materials-add-dialog/materials-add-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { filter, tap } from 'rxjs';

export enum MaterialType {
  PDF  = 'pdf',
  AUDIO = 'audio',
  VIDEO = 'video',
}

export const regexMaterials = {
  pdf: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*\.pdf(?:\?[^\s]*)?$/i,
  audio: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*\.(mp3|aac|ogg|wav)$/i,
  video: /(?:youtu\.be\/|youtube\.com\/(?:[^\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/?|.*[?&]v=))([a-zA-Z0-9_-]{11})/i,
}

@Component({
  selector: 'users-materials-add-button',
  standalone: true,
  imports: [CommonModule, 
    MatIconModule, 
    MatButtonModule, 
    MatTooltipModule, 
    MatFormFieldModule, 
    MatSelectModule, 
    MatMenuModule],
  templateUrl: './materials-add-button.component.html',
  styleUrls: ['./materials-add-button.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsAddButtonComponent {
    private title!: string;
      // private id!: string;
    public dialog = inject(MatDialog);
    private readonly materialsFacade = inject(MaterialsFacade);
    private readonly destroyRef = inject(DestroyRef);

    public materialType = MaterialType;
  
    //объявление метода openAddMaterialDialog, который принимает параметр type типа MaterialType. Метод не возвращает значения (void).
    openAddMaterialDialog(type: MaterialType): void {
      //открывается диалог с компонентом MaterialsAddDialogComponent с использованием MatDialog из Angular Material. MatDialogRef — это объект, который ссылается на открытый диалог. Мы передаем в диалог данные через свойство data, в котором передается объект с полем type, равным переданному параметру type.
// Тип MatDialogRef<MaterialsAddDialogComponent> указывает, что этот диалог будет работать с компонентом MaterialsAddDialogComponent
      const dialogRef: MatDialogRef<MaterialsAddDialogComponent> = 
      this.dialog.open(MaterialsAddDialogComponent, {
        data: { type },
      });
        dialogRef
        .afterClosed() // это метод, который возвращает Observable, который эмиттирует значение, когда диалог закрывается. Это может быть либо результат, который был передан при закрытии диалога, либо null, если пользователь закрыл диалог без выбора.
        .pipe(
          filter(Boolean), // этот оператор пропускает только значения, которые являются истинными (не null, не undefined, не false, не пустыми строками и т.д.). Это предотвращает дальнейшую обработку, если результат закрытия диалога не был получен или был отменен
//Внутри tap:
// Мы принимаем результат закрытия диалога (result), который ожидается как объект типа CreateMaterialDTO (например, объект с полями title и material_link).
// Создаем новый объект newMaterial типа CreateMaterialDTO, который содержит только title и material_link, полученные из result.
// Вызов this.materialsFacade.addMaterial(newMaterial) отправляет этот новый материал в materialsFacade, который, вероятно, обновляет хранилище данных или отправляет запрос на сервер для добавления материала.
// Важно отметить, что tap не изменяет поток, и это действие выполняется просто как побочный эффект.
          tap((result: CreateMaterialDTO) => {
            // Создаем новый материал и добавляем его через materialsFacade
            const newMaterial: CreateMaterialDTO = {
              title: result.title,
              material_link: result.material_link,
            };
            this.materialsFacade.addMaterial(newMaterial);
          })
        )
        .subscribe()
    }
//Вызов .subscribe() подписывается на Observable, возвращаемое из afterClosed(), и начинает выполнение асинхронных операций.
//  подписка на afterClosed() просто выполняет побочный эффект, инициированный в tap, и завершает обработку.
//не передаем никаких обработчиков в subscribe(), потому что все действия, которые должны быть выполнены после закрытия диалога, уже выполняются в tap.

// Метод открывает диалог MaterialsAddDialogComponent и передает в него параметр type.
// Когда диалог закрывается, результат (например, данные материала) передается через поток.
// Мы фильтруем ложные значения (null, undefined и т.д.) с помощью filter(Boolean), чтобы пропустить только валидные результаты.
// Используем tap для того, чтобы выполнить побочный эффект: создание нового материала и отправка его в materialsFacade.
// Подписка на результат через subscribe() запускает всю эту цепочку.
// Этот код используется для открытия диалога добавления материала, получения данных из диалога после его закрытия и отправки этих данных на сервер или в хранилище.


}
