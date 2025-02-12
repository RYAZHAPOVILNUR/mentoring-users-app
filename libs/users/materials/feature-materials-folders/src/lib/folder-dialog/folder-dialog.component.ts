import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";

@Component({
    selector: "users-folder-dialog",
    standalone: true,
    imports: [
        MatDialogModule,
        MatInputModule,
        MatButtonModule,
        FormsModule
        ],
    templateUrl: './folder-dialog.component.html',
    styleUrls: ['./folder-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class FolderDialogComponent {
    public folderName = '';
    
}