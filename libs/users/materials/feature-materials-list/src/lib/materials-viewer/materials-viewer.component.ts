import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, Inject } from "@angular/core";
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MaterialsVM, LinkRegEx } from "@users/materials/data-access";
import { PdfViewerModule } from "ng2-pdf-viewer";

@Component({
    selector: 'users-materials-viewer',
    standalone: true,
    imports: [CommonModule, MatDialogModule, PdfViewerModule, MatIconModule],
    templateUrl: './materials-viewer.component.html',
    styleUrls: ['./materials-viewer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class MaterialsViewerComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: MaterialsVM) { }
    public dialogRef = inject(MatDialogRef<MaterialsViewerComponent>);
    regEx = LinkRegEx;

    getVideoPreview = (url: string) => {
        const match = url.match(this.regEx.VIDEO_REGEX);

        if (match?.length && match[2]) {
            return `https://img.youtube.com/vi/${match[2]}/hqdefault.jpg`;
        }

        return url;
    };

    cancel(): void {
        this.dialogRef.close();
    };
}