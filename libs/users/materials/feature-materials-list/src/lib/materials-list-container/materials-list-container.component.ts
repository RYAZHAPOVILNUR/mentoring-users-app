import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateMaterialsButtonComponent } from '@materials/feature-materials-create';
import {  MaterialsFacade } from '@users/materials/data-access';

@Component({
  selector: 'users-materials-list-container',
  standalone: true,
  imports: [CommonModule, CreateMaterialsButtonComponent],
  templateUrl: './materials-list-container.component.html',
  styleUrls: ['./materials-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListContainerComponent {




}
