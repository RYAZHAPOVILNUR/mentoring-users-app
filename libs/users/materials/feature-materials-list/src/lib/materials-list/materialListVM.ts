import { IFolder } from "@users/materials/data-access";
import { IMaterialVM } from "../../materialVM";

export interface IMaterialListVM {
    materials: IMaterialVM[];
    openedFolder: IFolder | null;
}