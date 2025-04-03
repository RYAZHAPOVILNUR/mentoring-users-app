export interface Material {
    id: number
    created_at: string;
    title: string;
    material_link: string;
    folder_id: number
}

export type Materials = Material[];