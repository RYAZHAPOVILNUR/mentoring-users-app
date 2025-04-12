export interface Material {
    id: number
    created_at: string;
    title: string;
    material_link: string;
    folder_id: number
}

export interface newMaterial {
    title: string;
    material_link: string;
    folder_id: number
}