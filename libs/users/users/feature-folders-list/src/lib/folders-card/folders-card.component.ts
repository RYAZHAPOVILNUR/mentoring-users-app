import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomDatePipe, MaterialType } from '@users/settings/data-access';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { MaterialsAddButtonComponent, MaterialsAddDialogComponent } from '@users/feature-materials-create';
import { MaterialsCardComponent } from '@users/feature-materials-list';

@Component({
  selector: 'users-folders-card',
  standalone: true,
  templateUrl: './folders-card.component.html',
  styleUrls: ['./folders-card.component.scss'],
  imports: [CommonModule, CustomDatePipe, FoldersCardComponent, MatCardModule, MatButtonModule, MatIconModule, MaterialsAddButtonComponent]
})
export class FoldersCardComponent implements OnInit {
  id: number;
  materials: MaterialType[] = []

  constructor(
    private activateRoute: ActivatedRoute,
    public dialog: MatDialog,
    private store: Store
  ) {
    this.id = activateRoute.snapshot.params["id"];
  }

  ngOnInit(): void {
    this.getMaterial(this.id)

  }
  getMaterial(idFolder: number) {
    const data = [{ id: 777, created_at: 1715653222267, title: 'pdf2', material_link: 'https://bgu.ru/documents/Akkr_22.11.2017pril5.pdf', folder_id: 795 },
    { id: 761, created_at: 1715340044880, title: 'песня', material_link: 'http://www.sovmusic.ru/m32/hasta2.mp3', folder_id: 795 },
    { id: 814, created_at: 1716284865687, title: 'test', material_link: 'sskkmx.pdf', folder_id: 776 },
    { id: 769, created_at: 1715514022761, title: 'qwe', material_link: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', folder_id: 798 },
    { id: 806, created_at: 1716193695212, title: 'веб стандарты', material_link: 'https://www.youtube.com/embed/HN4SnAoolAg?si=-zBWAQARc0Znf5nH', folder_id: 796 },
    { id: 807, created_at: 1716194257736, title: 'гайд по собесам', material_link: 'https://www.youtube.com/watch?v=lq4TKfc-Ot4', folder_id: 796 },
    { id: 808, created_at: 1716194314087, title: 'белые розы', material_link: 'https://dnl1.drivemusic.me/dl/6VxjhKN6tA05T8ji5LWb…load_music/2019/03/jurijj-shatunov-belye-rozy.mp3', folder_id: 796 },
    { id: 817, created_at: 1716286654899, title: 'wwwww', material_link: 'wwwww.youtube.com', folder_id: 776 },
    { id: 776, created_at: 1715516180028, title: 'musictest', material_link: 'https://www.sousound.com/music/healing/healing_01.mp3', folder_id: 798 },
    { id: 812, created_at: 1716195047565, title: 'dummy', material_link: 'https://www.rd.usda.gov/sites/default/files/pdf-sample_0.pdf', folder_id: 796 },
    { id: 786, created_at: 1715655465646, title: 'танцы', material_link: 'https://youtu.be/gWHfyg_kDDg?si=fK18M9ufJvUw8snI', folder_id: 795 },
    { id: 788, created_at: 1715655771540, title: 'шатун', material_link: 'https://youtu.be/5JoWghHNUFA?si=anwOONXtSwausCIk', folder_id: 795 },
    { id: 789, created_at: 1715657042245, title: 'лиц пдф', material_link: 'https://bgu.ru/documents/Licen_10.03.2016.pdf', folder_id: 795 },
    { id: 790, created_at: 1715678287156, title: 'че', material_link: 'https://youtu.be/IWd0L04pSlA?si=9dmNbfzpGTUQQOvF', folder_id: 795 },
    { id: 792, created_at: 1715682603229, title: 'Video', material_link: 'https://www.youtube.com/watch?v=RslYMIKD3xs&ab_channel=IlnurRyazhapov', folder_id: 798 },
    { id: 795, created_at: 1715886932531, title: '1й2ц', material_link: 'https://www.youtube.com/watch?v=t3qzJOtLrkg', folder_id: 823 },
    { id: 797, created_at: 1715887518434, title: '1111', material_link: 'https://www.youtube.com/watch?v=FS7vDia1z7A&list=P…JL-TblXJqIOdRz1&index=1&ab_channel=IlnurRyazhapov', folder_id: 823 },
    { id: 798, created_at: 1715967724154, title: 'http', material_link: 'https://github.com/nblavoie/angular-documentation-pdf/blob/master/http.pdf', folder_id: 0 },
    { id: 799, created_at: 1715967835508, title: 'http', material_link: 'https://github.com/nblavoie/angular-documentation-pdf/blob/master/http.pdf', folder_id: 0 },
    { id: 800, created_at: 1715970574716, title: 'asdf', material_link: 'sadf', folder_id: 0 }]
    const filterData = data.filter(elem => elem.folder_id == idFolder)
    this.materials = filterData
    // this.store.dispatch(loadMaterials())
    // this.store.select(getMaterialList).subscribe(data => {
    //   let filterData = data.filter(elem => elem.folder_id == idFolder)
    //   this.materials = filterData
    // }
    // )
  }

  removeMaterial(materialId: number) {
    // this.store.dispatch(deleteMaterial({ id: materialId }))
  }

  openMaterial(materialId: number) {
    console.log(materialId);

    const dialogRef = this.dialog.open(MaterialsCardComponent, { width: '80%', height: '90%', data: { materialId: materialId } });
    dialogRef.afterClosed().subscribe();

  }
}
