import { FoldersListVM } from './folders-list.view-model';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterLink } from '@angular/router';
import { FoldersCardComponent } from '../folders-card/folders-card.component';
@Component({
    selector:'folders-list',
    templateUrl: './folders-list.component.html', 
    styleUrls: ['./folders-list.component.scss'] ,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule, FoldersCardComponent, MatProgressBarModule, RouterLink],

})

export class FoldersListComponent{
    @Input({required:true})
    vm!: FoldersListVM; 

}