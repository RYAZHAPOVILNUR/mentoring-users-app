import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  ViewEncapsulation,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { LetDirective } from "@ngrx/component";
import { UsersFacade } from "@users/users/data-access";
import { UsersListComponent } from "../users-list/users-list.component";
import { UsersVM } from "../users-vm";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
@Component({
  standalone: true,
  selector: "users-filter",
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
  ],
  templateUrl: "./users-filter.component.html",
  styleUrls: ["./users-filter.component.scss"],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [],
})
export class UsersFilterComponent {
  @Output() filterUsers = new EventEmitter<string>();
  @ViewChild("filterInput") filterInput:
    | ElementRef<HTMLInputElement>
    | undefined;

  public form = new FormGroup({
    filter: new FormControl(""),
  });

  public ngOnInit(): void {
    this.form.get("filter")?.valueChanges.subscribe((value: string | null) => {
      this.filterUsers.emit(value || "");
      localStorage.setItem("filterUsers", value || "");
    });
  }

  public ngAfterViewInit(): void {
    const filter = localStorage.getItem("filterUsers");
    if (filter) {
      this.form.get("filter")?.setValue(filter);
    }
  }
}
