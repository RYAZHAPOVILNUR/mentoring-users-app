import { DeepReadonly } from "@users/core/utils";

export type MaterialsVM = DeepReadonly<MaterialsEntity>;

export interface MaterialsEntity {
    id: number;
    created_at: string;
    title: string;
    material_link: string;
    folder_id: number;
};