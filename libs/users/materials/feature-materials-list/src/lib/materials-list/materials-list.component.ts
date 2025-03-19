import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TMaterialDTO, TMaterialListVM } from '@users/materials/data-access';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MaterialsCardComponent } from '../materials-card/materials-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'materials-list',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule, MaterialsCardComponent, MatButtonModule, MatIconModule],
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListComponent implements OnInit {
  @Input({ required: true })
  vm!: TMaterialListVM;

  @Output() deleteMaterial = new EventEmitter();

  @Output() redirectToMaterialContent = new EventEmitter();

  @Output() goBack = new EventEmitter();

  ngOnInit() {
    console.log(this.vm.folder);
    console.log(this.vm.folder?.title);
  }

  public onDeleteMaterial(material: TMaterialDTO): void {
    this.deleteMaterial.emit(material);
  }

  public onGoBack(): void {
    this.goBack.emit();
  }
}
