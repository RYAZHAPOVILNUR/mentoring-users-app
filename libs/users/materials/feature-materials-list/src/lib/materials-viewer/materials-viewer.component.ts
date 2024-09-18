import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, Inject, OnInit } from "@angular/core";
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MaterialsVM, YTRegExp } from "@users/materials/data-access";
import { PdfViewerModule } from "ng2-pdf-viewer";

@Component({
    selector: 'users-materials-viewer',
    standalone: true,
    imports: [CommonModule, MatDialogModule, PdfViewerModule, MatIconModule],
    templateUrl: './materials-viewer.component.html',
    styleUrls: ['./materials-viewer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class MaterialsViewerComponent implements OnInit {

    public dialogRef = inject(MatDialogRef<MaterialsViewerComponent>);
    public type = '';
    constructor(@Inject(MAT_DIALOG_DATA) public data: MaterialsVM) {
    }

    ngOnInit(): void {
        this.type = this.getFileType(this.data.material_link);
    }

    getFileType = (url: string) => {
        if (url.endsWith('pdf')) {
            return 'pdf';
        } else if (url.endsWith('mp3')) {
            return 'mp3';
        } else if (url.includes('youtube.com')) {
            return 'YT';
        }
        return '';
    };

    getVideoPreview = (link: string) => {
        const url = new URL(link);
        const id = url.searchParams.get('v');
        return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;


        // // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        // const match = url.match(YTRegExp)![1] || '';
        // console.log(match);
        // return match;
        // if (match) {
        //     const id = (match && match[7].length == 11) ? match[7] : '';
        //     console.log(id);
        //     if (id) {
        //         return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
        //     }
        //     return null;
        // }
        // return null;
    };

    cancel(): void {
        this.dialogRef.close();
    };

    save(): void {
        // if (this.formGroup.valid) {
        //     const formData = {
        //         name: this.formGroup.value.name,
        //         email: this.formGroup.value.email.trim().toLowerCase(),
        //     };
        //     this.dialogRef.close(formData);
        // }
    }
}